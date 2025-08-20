import { useEffect, useRef, useState } from 'react';
import {
  GestureRecognizer,
  FilesetResolver,
  GestureRecognizerResult,
} from '@mediapipe/tasks-vision';
import './style.css';

enum Click {
  left = 'click',
  right = 'contextmenu',
}

interface HandsContainerProps {
  enabled: boolean;
  onDisable?: () => void; // Callback to disable hand tracking from parent
}

const HandsContainer = ({ enabled, onDisable }: HandsContainerProps) => {
  const [videoError, setVideoError] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [inputVideoReady, setInputVideoReady] = useState(false);
  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);

  const lastVideoTimeRef = useRef(-1);

  const inputVideoRef = useRef<HTMLVideoElement | null>(null);
  const started = useRef(false);

  // Smoothing refs
  const smoothedPosition = useRef({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const positionBuffer = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const smoothingFactor = 0.3; // Lower = smoother but more lag
  const maxBufferSize = 5; // Number of frames to average
  const minUpdateInterval = 16; // Minimum ms between updates (60fps max)
  const deadZone = 2; // Minimum pixel movement to register (reduces micro-jitter)
  const maxVelocity = 50; // Maximum pixels per frame to prevent sudden jumps
  
  // Mouse escape system: move mouse to call setIsGesture(false) and completely disable hand tracking

  // Scroll smoothing
  const scrollBuffer = useRef<Array<number>>([]);
  const lastScrollTime = useRef(0);
  const scrollSmoothingFactor = 0.4; // Lower = smoother scrolling (0.2-0.6 recommended)
  const maxScrollBufferSize = 3; // Number of scroll values to average (3-5 recommended)
  const minScrollInterval = 16; // Minimum ms between scroll updates (16 = 60fps max, higher = smoother)
  const scrollDeadZone = 0.02; // Minimum hand movement to trigger scrolling (reduces jitter)
  const scrollMultiplier = 100; // Scroll speed multiplier (10-30 recommended)

  const smoothScroll = (newScrollSpeed: number) => {
    const now = Date.now();
    
    // Add new scroll speed to buffer
    scrollBuffer.current.push(newScrollSpeed);
    
    // Keep only recent scroll values
    if (scrollBuffer.current.length > maxScrollBufferSize) {
      scrollBuffer.current.shift();
    }
    
    // Calculate weighted average (newer values have more weight)
    let totalWeight = 0;
    let weightedSum = 0;
    
    scrollBuffer.current.forEach((speed, index) => {
      const weight = index + 1; // Newer values get higher weight
      weightedSum += speed * weight;
      totalWeight += weight;
    });
    
    const averagedSpeed = weightedSum / totalWeight;
    
    // Apply exponential smoothing
    const smoothedSpeed = averagedSpeed * scrollSmoothingFactor;
    
    return Math.round(smoothedSpeed); // Round to avoid sub-pixel scrolling
  };

  // webcam control
  useEffect(() => {
    if (!enabled || !inputVideoReady) return;
    if (started.current) return;
    started.current = true;
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
  }, [inputVideoReady, enabled]);

  useEffect(() => {
    if (!enabled) {
      // Clean up when disabled
      if (inputVideoRef.current && inputVideoRef.current.srcObject) {
        const stream = inputVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        inputVideoRef.current.srcObject = null;
      }
      setGestureRecognizer(null);
      started.current = false;
      setInputVideoReady(false);
      return;
    }

    if (!inputVideoReady && !gestureRecognizer) {
      return;
    }

    const constraints = {
      video: { width: { min: 480 }, height: { min: 360 } },
    };
    if (navigator.mediaDevices === undefined) {
      setVideoError(true);
      return;
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        if (inputVideoRef.current) {
          inputVideoRef.current.srcObject = stream;
        }
        sendToMediaPipe();
      })
      .catch((err) => {
        setVideoError(true);
        return;
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
  }, [gestureRecognizer, enabled]);

  // paint splatter effect

  const splatterColors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
    '#ffff00',
    '#ff00ff',
    '#00ffff',
  ];
  const splatterRange = 100;

  const splatterContainer = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    splatterContainer.current = document.querySelector('#paint-on');
  }, []);

  const createSplatterElement = (x: number, y: number, size: number) => {
    if (!splatterContainer.current) return;

    const splatter = document.createElement('div');
    splatter.classList.add('splatter');

    const randomRotation = Math.floor(Math.random() * 360);
    const randomOpacity = Math.random() * 0.5 + 0.1;
    const randomColor =
      splatterColors[Math.floor(Math.random() * splatterColors.length)];

    let newX = x + (2 * Math.random() - 1) * splatterRange + 10;
    newX -= size / 2;
    let newY = y + (2 * Math.random() - 1) * splatterRange + 20;
    newY += window.scrollY - size / 2;

    splatter.style.width = `${size}px`;
    splatter.style.height = `${size}px`;
    splatter.style.left = `${newX}px`;
    splatter.style.top = `${newY}px`;
    splatter.style.transform = `rotate(${randomRotation}deg)`;
    splatter.style.backgroundColor = randomColor;
    splatter.style.opacity = `${randomOpacity}`;
    splatter.style.color = randomColor;

    splatterContainer.current.appendChild(splatter);

    setTimeout(() => {
      splatter.remove();
    }, Math.random() * 10000 + 1000);
  };

  const createSplatter = ({ x, y }: { x: number; y: number }) => {
    let splatterCount = Math.floor(Math.random() * 5) + 5;
    let bigSplatterCount = Math.floor(Math.random() * 2) + 1;

    while (splatterCount > 0) {
      const size = Math.floor(Math.random() * 20) + 10;
      createSplatterElement(x, y, size);
      splatterCount--;
    }
    while (bigSplatterCount > 0) {
      const size = Math.floor(Math.random() * 100) + 50;
      createSplatterElement(x, y, size);
      bigSplatterCount--;
    }
  };

  // cursor control
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const isHandClickGesture = useRef(false);
  const isHandContextGesture = useRef(false);
  const lastRightClickTime = useRef(0);
  const lastElementHovered = useRef<Element | null>(null);
  const indices = [0, 5, 9, 13, 17]; // palm indices
  const prevCursorPosition = useRef({ x: 0, y: 0 });
  const lastSplatterTime = useRef(0);
  const lastFrameTime = useRef(0);
  // Smoothing function to reduce jitter
  const smoothPosition = (newX: number, newY: number) => {
    const now = Date.now();
    
    // Add new position to buffer
    positionBuffer.current.push({ x: newX, y: newY, timestamp: now });
    
    // Keep only recent positions
    if (positionBuffer.current.length > maxBufferSize) {
      positionBuffer.current.shift();
    }
    
    // Calculate weighted average of recent positions (newer positions have more weight)
    let totalWeight = 0;
    let weightedX = 0;
    let weightedY = 0;
    
    positionBuffer.current.forEach((pos, index) => {
      const weight = index + 1; // Newer positions get higher weight
      weightedX += pos.x * weight;
      weightedY += pos.y * weight;
      totalWeight += weight;
    });
    
    const averagedX = weightedX / totalWeight;
    const averagedY = weightedY / totalWeight;
    
    // Apply exponential smoothing
    smoothedPosition.current.x = smoothedPosition.current.x * (1 - smoothingFactor) + averagedX * smoothingFactor;
    smoothedPosition.current.y = smoothedPosition.current.y * (1 - smoothingFactor) + averagedY * smoothingFactor;
    
    // Apply velocity limiting to prevent sudden jumps
    const currentX = smoothedPosition.current.x;
    const currentY = smoothedPosition.current.y;
    const deltaX = averagedX - currentX;
    const deltaY = averagedY - currentY;
    
    // Limit velocity to prevent sudden large movements
    const limitedDeltaX = Math.max(-maxVelocity, Math.min(maxVelocity, deltaX));
    const limitedDeltaY = Math.max(-maxVelocity, Math.min(maxVelocity, deltaY));
    
    // Apply dead zone to filter out micro-movements
    if (Math.abs(limitedDeltaX) < deadZone && Math.abs(limitedDeltaY) < deadZone) {
      // Movement is too small, maintain previous position
      return { x: currentX, y: currentY };
    }
    
    // Return position with velocity limiting applied
    return { 
      x: currentX + limitedDeltaX, 
      y: currentY + limitedDeltaY 
    };
  };

  const processResults = (results: GestureRecognizerResult) => {
    // If using mouse, completely skip hand tracking processing
    if (usingMouse.current) {
      return;
    }

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
      // Scroll up when hand is in top area
      const scrollIntensity = (0.15 - y) / 0.15;
      if (scrollIntensity > scrollDeadZone) {
        scrollSpeed = scrollIntensity * scrollMultiplier;
        scrollSpeed *= -1; // Negative for upward scrolling
      }
    } else if (y > 0.75) {
      // Scroll down when hand is in bottom area
      const scrollIntensity = (y - 0.75) / 0.25;
      if (scrollIntensity > scrollDeadZone) {
        scrollSpeed = scrollIntensity * scrollMultiplier;
      }
    }

    x = x * (window.innerWidth + 200) - 100;
    y = y * (window.innerHeight + 400) - 200;
    x = window.innerWidth - x;

    x = Math.max(0, Math.min(window.innerWidth, x));
    y = Math.max(0, Math.min(window.innerHeight, y));

    if (scrollSpeed !== 0) {
      // Apply scroll smoothing and rate limiting
      const now = Date.now();
      if (now - lastScrollTime.current >= minScrollInterval) {
        const smoothedScrollSpeed = smoothScroll(scrollSpeed);
        window.scrollBy(0, smoothedScrollSpeed);
        lastScrollTime.current = now;
      }
    }
    
    // Apply hand tracking with smoothing
    const now = Date.now();
    if (now - lastUpdateTime.current >= minUpdateInterval) {
      const smoothed = smoothPosition(x, y);
      setCursorPosition(smoothed);
      lastUpdateTime.current = now;
    }

    handleCursorPosition({ x, y });

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

  const handleCursorPosition = ({ x, y }: { x: number; y: number }) => {
    const cursorSpeed =
      Math.sqrt(
        Math.pow(x - prevCursorPosition.current.x, 2) +
          Math.pow(y - prevCursorPosition.current.y, 2)
      ) /
      (Date.now() - lastFrameTime.current);
    lastFrameTime.current = Date.now();
    if (Date.now() - lastSplatterTime.current > 50 && cursorSpeed > 0.5) {
      createSplatter({ x, y });
      prevCursorPosition.current = { x, y };
      lastSplatterTime.current = Date.now();
    }

    prevCursorPosition.current = { x, y };

    const element: Element | null = document.elementFromPoint(x, y);
    if (lastElementHovered.current !== element) {
      const prev: Element | null = lastElementHovered.current as Element | null;
      if (prev) {
        let parent: Element | null = prev;
        while (parent) {
          parent.className = parent.className.replace(' mouse_hovering', '');
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
            parent.className += ' mouse_hovering';
            isClickable = true;
          }
          parent = parent.parentElement;
        }
        setIsHoveringClickable(isClickable);
        lastElementHovered.current = element;
      }
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
    if (element.tagName === 'A') {
      const href = element.getAttribute('href');
      if (href) {
        window.open(href, '_blank')?.focus();
      }
    }
    console.log(element);
    element.className += ' mouse_clicked';
    setTimeout(() => {
      element.className = element.className.replace(' mouse_clicked', '');
    }, 100);
  };

  const usingMouse = useRef(true);
  const prevMousePosition = useRef({ x: 0, y: 0 });
  const prevMouseTime = useRef(0);
  const stopMouseInterval = useRef<NodeJS.Timeout | null>(null);

  // mouse control
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      
      // Calculate mouse speed
      const mouseSpeed =
        Math.sqrt(
          Math.pow(e.clientX - prevMousePosition.current.x, 2) +
            Math.pow(e.clientY - prevMousePosition.current.y, 2)
        ) /
        (Date.now() - prevMouseTime.current);
      
      if (mouseSpeed > 0.1) {
        // IMMEDIATELY set mouse mode to block hand tracking
        usingMouse.current = true;
        
        // Call disable callback to turn off hand tracking completely
        if (enabled && onDisable) {
          onDisable(); // This calls setIsGesture(false) in App.tsx
        }
        
        // Direct mouse control - no smoothing
        setCursorPosition({ x: e.clientX - 15, y: e.clientY - 15 });
        
        // Clear any existing timer
        if (stopMouseInterval.current) {
          clearTimeout(stopMouseInterval.current);
        }
        
        // Set timer to reset mouse flag after mouse stops
        stopMouseInterval.current = setTimeout(() => {
          usingMouse.current = false;
        }, 1000); // 1 second delay before allowing hand tracking to be re-enabled
      }
      
      if (videoError) {
        handleCursorPosition({ x: e.clientX, y: e.clientY });
      }
      
      prevMousePosition.current = { x: e.clientX, y: e.clientY };
      prevMouseTime.current = Date.now();
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      const prev: Element | null = lastElementHovered.current as Element | null;
      if (prev) {
        prev.className = prev.className.replace(' hover', '');
      }
    };
  }, [videoError, enabled, onDisable]);

  return (
    <div className='hands-container ignore-mouse'>
      {enabled && (
        <>
          {videoError ? (
            <div
              className='error'
              style={{
                position: 'fixed',
                left: '50%',
                top: '10px',
                transform: 'translate(-50%,0)',
              }}>
              <h1>Oops!</h1>
              <h2>Your webcam is not working.</h2>
              <p>Enable permissions or try refreshing the page</p>
            </div>
          ) : (
            <video
              autoPlay
              onError={(e) => {
                setVideoError(true);
              }}
              style={{ display: 'none' }}
              ref={(el) => {
                inputVideoRef.current = el;
                setInputVideoReady(!!el);
              }}
            />
          )}

          <div
            className='cursor'
            style={{
              position: 'fixed',
              left: cursorPosition.x - 25,
              top: cursorPosition.y - 25,
              fontSize: '50px',
              zIndex: 999,
            }}>
            {isHoveringClickable ? '👆' : '🤚'}
          </div>
        </>
      )}
    </div>
  );
};

export default HandsContainer;
