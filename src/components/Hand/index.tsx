import { useEffect, useRef, useState, useCallback } from 'react';
import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult,
} from '@mediapipe/tasks-vision';

enum Click {
  left = 'click',
  right = 'contextmenu',
}

const HandsContainer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);

  const lastVideoTimeRef = useRef(-1);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);

  // webcam control
  useEffect(() => {
    if (!inputVideoReady) {
      return;
    }
    if (inputVideoRef.current) {
      const initGesture = async () => {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );
        const gr = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
        });
        setGestureRecognizer(gr);
      };
      initGesture();
    }
  }, [inputVideoReady]);

  useEffect(() => {
    if (!inputVideoReady && !gestureRecognizer) {
      return;
    }
    const constraints = {
      video: { width: { min: 480 }, height: { min: 360 } },
    };
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      if (inputVideoRef.current) {
        inputVideoRef.current.srcObject = stream;
      }
      sendToMediaPipe();
    });
    const sendToMediaPipe = async () => {
      if (inputVideoRef.current) {
        if (!inputVideoRef.current.videoWidth || !gestureRecognizer) {
          requestAnimationFrame(sendToMediaPipe);
          return;
        }
        if (inputVideoRef.current.currentTime === lastVideoTimeRef.current) {
          requestAnimationFrame(sendToMediaPipe);
          return;
        }
        const results = await gestureRecognizer.recognizeForVideo(
          inputVideoRef.current,
          Date.now()
        );
        lastVideoTimeRef.current = inputVideoRef.current.currentTime;
        processResults(results);
        requestAnimationFrame(sendToMediaPipe);
      }
    };
  }, [gestureRecognizer]);

  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const isHandClickGesture = useRef(false);
  const isHandContextGesture = useRef(false);
  const lastRightClickTime = useRef(0);
  const lastElementHovered = useRef<Element | null>(null);
  const indices = [0, 5, 9, 13, 17]; // palm indices
  const processResults = (results: GestureRecognizerResult) => {
    let x = 0;
    let y = 0;
    if (!results.landmarks) return;
    if (!results.landmarks[0]) return;
    const landmarks = results.landmarks[0];
    if (!landmarks) return;
    indices.forEach((i) => {
      x += landmarks[i].x;
      y += landmarks[i].y;
    });

    x /= indices.length;
    y /= indices.length;

    let scrollSpeed = 0;
    if (y < 0.15) {
      scrollSpeed = (0.15 - y) / 0.15;
      scrollSpeed = scrollSpeed * 30 + 5;
      scrollSpeed *= -1;
    } else if (y > 0.8) {
      scrollSpeed = (y - 0.8) / 0.2;
      scrollSpeed = scrollSpeed * 30 + 5;
    }

    x *= window.innerWidth;
    y *= window.innerHeight;
    x = window.innerWidth - x;

    setCursorPosition({ x, y });
    if (scrollSpeed !== 0) {
      window.scrollBy(0, scrollSpeed);
    }

    const element: Element | null = document.elementFromPoint(x, y);
    if (lastElementHovered.current !== element) {
      const prev: Element | null = lastElementHovered.current as Element | null;
      if (prev) {
        let parent: Element | null = prev;
        while (parent) {
          parent.className = parent.className.replace(' hover', '');
          parent = parent.parentElement;
        }
      }
      if (element) {
        // any parent element with class clickable
        let isClickable = false;
        let parent: Element | null = element;
        while (parent) {
          if (
            parent.className.includes('clickable') ||
            parent.tagName === 'BUTTON' ||
            parent.tagName === 'A'
          ) {
            parent.className += ' hover';
            isClickable = true;
          }
          parent = parent.parentElement;
        }
        console.log(element);
        setIsHoveringClickable(isClickable);
        lastElementHovered.current = element;
      }
    }

    if (!results.gestures) return;
    if (!results.gestures[0]) return;
    if (!results.gestures[0][0]) return;
    const gesture = results.gestures[0][0];
    if (gesture.categoryName === 'Closed_Fist') {
      if (!isHandClickGesture.current) {
        simulateClick({ x, y }, Click.left);
        isHandClickGesture.current = true;
      }
    } else {
      isHandClickGesture.current = false;
    }
    if (Date.now() - lastRightClickTime.current < 1000) return;
    if (gesture.categoryName === 'ILoveYou') {
      if (!isHandContextGesture.current) {
        simulateClick({ x, y }, Click.right);
        isHandContextGesture.current = true;
      }
    } else {
      isHandContextGesture.current = false;
    }
  };

  const simulateClick = (position: { x: number; y: number }, type: Click) => {
    lastRightClickTime.current = Date.now();
    const clickEvent = new MouseEvent(type, {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: position.x,
      clientY: position.y,
    });
    const element: Element | null = document.elementFromPoint(
      position.x,
      position.y
    );
    if (!element) return;
    element.dispatchEvent(clickEvent);
    element.className += ' click';
    setTimeout(() => {
      element.className = element.className.replace(' click', '');
    }, 100);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'q') {
        simulateClick(cursorPosition, Click.left);
      }
    },
    [cursorPosition]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      const prev: Element | null = lastElementHovered.current as Element | null;
      if (prev) {
        prev.className = prev.className.replace(' hover', '');
      }
    };
  }, []);

  return (
    <div className='hands-container ignore-mouse'>
      <video
        autoPlay
        style={{ display: 'none' }}
        ref={(el) => {
          inputVideoRef.current = el;
          setInputVideoReady(!!el);
        }}
      />

      <div
        className='cursor'
        style={{
          position: 'fixed',
          left: cursorPosition.x,
          top: cursorPosition.y,
          fontSize: '50px',
          zIndex: 999,
        }}>
        {isHoveringClickable ? '👆' : '🤚'}
      </div>
    </div>
  );
};

export default HandsContainer;
