import React, { useEffect, useRef, useState } from 'react';

interface ScratchCardProps {
  width: number;
  height: number;
  finishPercent?: number;
  onComplete?: () => void;
  children: React.ReactNode;
  overlayColor?: string;
  overlayText?: string;
}

export const ScratchCard: React.FC<ScratchCardProps> = ({
  width,
  height,
  finishPercent = 50,
  onComplete,
  children,
  overlayColor = '#C0C0C0',
  overlayText = 'Зітріть, щоб дізнатись таємницю'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill with silver/overlay color
    ctx.fillStyle = overlayColor;
    ctx.fillRect(0, 0, width, height);

    // Add some texture/noise
    for (let i = 0; i < 1000; i++) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
    }

    // Add text
    ctx.font = '16px "Cormorant Garamond", serif';
    ctx.fillStyle = '#444';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(overlayText, width / 2, height / 2);

  }, [width, height, overlayColor, overlayText]);

  const scratch = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isComplete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();

    checkProgress();
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || isComplete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, width, height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparentPixels++;
    }

    const percent = (transparentPixels / (pixels.length / 4)) * 100;
    if (percent >= finishPercent) {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || isComplete) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    scratch(x, y);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div className="scratch-container overflow-hidden rounded-xl shadow-inner bg-white border border-stone-200" style={{ width, height }}>
      <div className="flex items-center justify-center w-full h-full p-4 text-center">
        {children}
      </div>
      {!isComplete && (
        <canvas
          ref={canvasRef}
          width={width}
          height={height}
          className="scratch-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        />
      )}
    </div>
  );
};
