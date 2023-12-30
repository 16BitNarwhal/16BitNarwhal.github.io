import { useEffect, useRef, useState, useCallback } from 'react';
import { Results, Hands, HAND_CONNECTIONS, VERSION } from '@mediapipe/hands';
import {
  drawConnectors,
  drawLandmarks,
  Data,
  lerp,
} from '@mediapipe/drawing_utils';

const HandsContainer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);

  // webcam control
  useEffect(() => {
    if (!inputVideoReady) {
      return;
    }
    if (inputVideoRef.current) {
      const constraints = {
        video: { width: { min: 1280 }, height: { min: 720 } },
      };
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        if (inputVideoRef.current) {
          inputVideoRef.current.srcObject = stream;
        }
        sendToMediaPipe();
      });

      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${VERSION}/${file}`,
      });

      hands.setOptions({
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(onResults);

      const sendToMediaPipe = async () => {
        if (inputVideoRef.current) {
          if (!inputVideoRef.current.videoWidth) {
            requestAnimationFrame(sendToMediaPipe);
          } else {
            await hands.send({ image: inputVideoRef.current });
            requestAnimationFrame(sendToMediaPipe);
          }
        }
      };
    }
  }, [inputVideoReady]);

  const onResults = (results: Results) => {
    setLoaded(true);
    if (results.multiHandLandmarks) {
      const landmarks = results.multiHandLandmarks[0];
      if (!landmarks) return;
      let x = 0;
      let y = 0;
      for (let index = 0; index < landmarks.length; index++) {
        x += landmarks[index].x! * window.innerWidth;
        y += landmarks[index].y! * window.innerHeight;
      }
      x /= landmarks.length;
      y /= landmarks.length;
      x = window.innerWidth - x;

      // const landmarks = results.multiHandLandmarks[0];
      // if (!landmarks || !landmarks[8]) return;
      // let x = landmarks[8].x! * window.innerWidth;
      // let y = landmarks[8].y! * window.innerHeight;
      // x = window.innerWidth - x;

      setCursorPosition({ x, y });
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
