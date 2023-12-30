import { useEffect, useRef, useState, useCallback } from 'react';
import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult,
} from '@mediapipe/tasks-vision';

const HandsContainer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);
  const [lastVideoTime, setLastVideoTime] = useState(-1);

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
        if (inputVideoRef.current.currentTime === lastVideoTime) {
          requestAnimationFrame(sendToMediaPipe);
          return;
        }
        const results = await gestureRecognizer.recognizeForVideo(
          inputVideoRef.current,
          Date.now()
        );
        setLastVideoTime(inputVideoRef.current.currentTime);
        processResults(results);
        requestAnimationFrame(sendToMediaPipe);
      }
    };
  }, [gestureRecognizer]);

  const processResults = (results: GestureRecognizerResult) => {
    if (results.gestures && results.gestures[0] && results.gestures[0][0]) {
      const gesture = results.gestures[0][0];
      // console.log(gesture.categoryName);
      // if (gesture.categoryName === 'Closed_Fist') {
      //   simulateLeftClick(cursorPosition);
      // }
    }
    if (results.landmarks && results.landmarks[0]) {
      const landmarks = results.landmarks[0];
      if (!landmarks) return;
      let x = 0,
        y = 0;

      for (let index = 0; index < landmarks.length; index++) {
        x += landmarks[index].x;
        y += landmarks[index].y;
      }
      x *= window.innerWidth / landmarks.length;
      y *= window.innerHeight / landmarks.length;
      x = window.innerWidth - x;

      setCursorPosition({ x, y });

      // if (!landmarks || !landmarks[8]) return;
      // let x = landmarks[8].x! * window.innerWidth;
      // let y = landmarks[8].y! * window.innerHeight;
      // x = window.innerWidth - x;
    }
  };

  // mouse control
  // const updateCursorPosition = (e: MouseEvent) => {
  //   setCursorPosition({
  //     x: e.clientX + window.scrollX,
  //     y: e.clientY + window.scrollY,
  //   });
  // };

  // useEffect(() => {
  //   window.addEventListener('mousemove', updateCursorPosition);
  //   return () => window.removeEventListener('mousemove', updateCursorPosition);
  // }, []);

  const simulateLeftClick = (position: { x: number; y: number }) => {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
      clientX: position.x,
      clientY: position.y,
    });
    document
      .elementFromPoint(position.x, position.y)
      ?.dispatchEvent(clickEvent);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'q') {
        simulateLeftClick(cursorPosition);
      }
    },
    [cursorPosition]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    document.body.style.cursor = 'none';
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className='hands-container ignore-mouse'>
      <video
        autoPlay
        // style={{ display: 'none' }}
        ref={(el) => {
          inputVideoRef.current = el;
          setInputVideoReady(!!el);
        }}
      />

      <div
        className='cursor'
        style={{
          position: 'absolute',
          left: cursorPosition.x + window.scrollX,
          top: cursorPosition.y + window.scrollY,
          fontSize: '50px',
        }}>
        👆
      </div>
    </div>
  );
};

export default HandsContainer;
