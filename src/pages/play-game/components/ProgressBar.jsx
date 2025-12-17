import React, { useState, useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';

const ProgressBar = forwardRef(({ totalTime, onComplete }, ref) => {
    // Total duration in milliseconds
    const durationMs = totalTime * 1000;

    // State
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0); // in ms
    const [progress, setProgress] = useState(0); // 0 to 100 percentage

    // Refs for persistent values
    const startTimeRef = useRef(null);
    const animationFrameRef = useRef(null);
    const timeElapsedAtPauseRef = useRef(0);

    // Calculate percentage progress
    const calculateProgress = (elapsed) => {
        return Math.min(100, (elapsed / durationMs) * 100);
    };

    const onReset = () => {
        setTimeElapsed(0);
        setProgress(0);
        timeElapsedAtPauseRef.current = 0;
    }

    // --- Animation Loop using requestAnimationFrame ---
    const animateProgress = useCallback((timestamp) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp - timeElapsedAtPauseRef.current;
        }

        // Calculate the elapsed time relative to the starting point
        const currentElapsed = timestamp - startTimeRef.current;

        // Update state for time elapsed
        setTimeElapsed(currentElapsed);

        // Calculate and update progress percentage
        const newProgress = calculateProgress(currentElapsed);
        setProgress(newProgress);

        if (currentElapsed < durationMs) {
            // Continue the animation loop
            animationFrameRef.current = requestAnimationFrame(animateProgress);
        } else {
            // Time is complete
            setProgress(100);
            setIsPlaying(false);
            onComplete && onComplete();
        }
    }, [durationMs, onComplete]);

    // --- Main Effect for Timer Control ---
    useEffect(() => {
        if (isPlaying) {
            // Start the animation loop
            animationFrameRef.current = requestAnimationFrame(animateProgress);
        } else {
            // Stop the animation loop
            cancelAnimationFrame(animationFrameRef.current);
            // Store the current elapsed time for resuming
            timeElapsedAtPauseRef.current = timeElapsed;
            // Reset start time ref
            startTimeRef.current = null;
        }

        // Cleanup function to ensure animation frame is canceled on unmount
        return () => {
            cancelAnimationFrame(animationFrameRef.current);
        };
    }, [isPlaying, timeElapsed, animateProgress]);


    useImperativeHandle(ref, () => ({
        togglePlayPause: togglePlayPause,
        timeElapsed: timeElapsed,
        onReset: onReset,
        setIsPlaying: setIsPlaying
    }));

    // --- Control Handlers ---
    const togglePlayPause = () => {
        if (progress >= 100) {
            // If completed, reset to start and then play
            onReset();
            setIsPlaying(true);
        } else {
            setIsPlaying(prev => !prev);
        }
    };

    return (
        <>
            <div className="progress-container">
                <div
                    className={`progress-bar ${progress < 80 ? 'bg-green-600' : progress < 90 ? 'bg-yellow-500' : progress === 100 ? 'bg-gray-300' : 'bg-red-600' } `}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        </>
    );
});

export default ProgressBar;