import { useEffect, useRef, useState } from 'react';
import { Results, Hands, HAND_CONNECTIONS, VERSION } from '@mediapipe/hands';
import {
  drawConnectors,
  drawLandmarks,
  Data,
  lerp,
} from '@mediapipe/drawing_utils';
import './index.scss';

const HandsContainer = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  // webcam control
  useEffect(() => {
    if (!inputVideoReady) {
      return;
    }
    if (inputVideoRef.current && canvasRef.current) {
      console.log('rendering');
      contextRef.current = canvasRef.current.getContext('2d');

      // flip the video horizontally (scale X by -1)
      if (contextRef.current) {
        contextRef.current.scale(-1, 1);
        contextRef.current.translate(-canvasRef.current.width, 0);
      }

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
            console.log(inputVideoRef.current.videoWidth);
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
    if (canvasRef.current && contextRef.current) {
      setLoaded(true);

      contextRef.current.save();
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      contextRef.current.drawImage(
        results.image,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      if (results.multiHandLandmarks && results.multiHandedness) {
        for (
          let index = 0;
          index < results.multiHandLandmarks.length;
          index++
        ) {
          const classification = results.multiHandedness[index];
          const isRightHand = classification.label === 'Right';
          const landmarks = results.multiHandLandmarks[index];
          drawConnectors(contextRef.current, landmarks, HAND_CONNECTIONS, {
            color: isRightHand ? '#00FF00' : '#FF0000',
          });
          drawLandmarks(contextRef.current, landmarks, {
            color: isRightHand ? '#00FF00' : '#FF0000',
            fillColor: isRightHand ? '#FF0000' : '#00FF00',
            radius: (data: Data) => {
              return lerp(data.from!.z!, -0.15, 0.1, 10, 1);
            },
          });
        }
      }
      if (results.multiHandLandmarks) {
        const landmarks = results.multiHandLandmarks[0];
        if (!landmarks || !landmarks[8]) return;
        let x = landmarks[8].x! * canvasRef.current.width;
        x = canvasRef.current.width - x;
        const y = landmarks[8].y! * canvasRef.current.height;
        setCursorPosition({ x, y });
        console.log(x, y);
      }
      contextRef.current.restore();
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

  // const simulateLeftClick = () => {
  //   const clickEvent = new MouseEvent('click', {
  //     view: window,
  //     bubbles: true,
  //     cancelable: true,
  //     clientX: cursorPosition.x,
  //     clientY: cursorPosition.y,
  //   });
  //   document
  //     .elementFromPoint(cursorPosition.x, cursorPosition.y)
  //     ?.dispatchEvent(clickEvent);
  // };

  return (
    <div className='hands-container'>
      <video
        autoPlay
        style={{ transform: 'scaleX(-1)' }}
        ref={(el) => {
          inputVideoRef.current = el;
          setInputVideoReady(!!el);
        }}
      />
      {/* use screen width and height */}
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {!loaded && (
        <div className='loading'>
          <div className='spinner'></div>
          <div className='message'>Loading</div>
        </div>
      )}
      <div
        className='cursor'
        style={{
          position: 'absolute',
          left: cursorPosition.x,
          top: cursorPosition.y,
          fontSize: '50px',
        }}>
        👆
      </div>
    </div>
  );
};

export default HandsContainer;
