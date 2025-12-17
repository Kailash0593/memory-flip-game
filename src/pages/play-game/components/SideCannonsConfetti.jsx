import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const SideCannonsConfetti = ({ celebrateTime=3000 }) => {
    const canvasRef = useRef(null);

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Create a confetti instance associated with this specific canvas
        const myConfetti = confetti.create(canvas, {
            resize: true,
            useWorker: true, // Use a web worker for performance
        });

        const duration = celebrateTime;
        const animationEnd = Date.now() + duration;

        const frame = () => {
            // Stop animation when duration is over
            if (Date.now() > animationEnd) return;

            // Fire from left origin
            myConfetti({
                startVelocity: 30, spread: 360, ticks: 60, particleCount: 5,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            // Fire from right origin
            myConfetti({
                startVelocity: 30, spread: 360, ticks: 60,  particleCount: 5,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });

            requestAnimationFrame(frame);
        };

        frame();

        // Cleanup function to stop animation when component unmounts
        return () => {
            myConfetti.reset(); // Stop all animations
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Allows interaction with elements behind the canvas
                zIndex: 1
            }}
        />
    );
};

export default SideCannonsConfetti;