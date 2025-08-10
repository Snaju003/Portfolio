"use client";

import { useEffect, useState, useRef } from "react";
import { Cursor } from "./terminal-elements";

export function TypedText({
	text,
	speed = 90, // slower default
	startDelay = 350,
	loop = false,
	loopDelay = 0,
	className = "",
	showCursor = true, // Default to showing the cursor
	onComplete,
}: {
	text: string;
	speed?: number;
	startDelay?: number;
	loop?: boolean;
	loopDelay?: number;
	className?: string;
	showCursor?: boolean;
	onComplete?: () => void;
}) {
	const [display, setDisplay] = useState("");
	const [reduced, setReduced] = useState(false);
	const [cursorVisible, setCursorVisible] = useState(true);

	// Use refs to track and clear timers
	const timersRef = useRef<number[]>([]);

	const clearTimers = () => {
		timersRef.current.forEach((timer) => window.clearTimeout(timer));
		timersRef.current = [];
	};

	const addTimer = (timer: number) => {
		timersRef.current.push(timer);
		return timer;
	};

	// Check for reduced motion preference
	useEffect(() => {
		const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduced(mq.matches);
		const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);

		if (mq.addEventListener) mq.addEventListener("change", onChange);
		else mq.addListener(onChange as any);

		return () => {
			if (mq.removeEventListener)
				mq.removeEventListener("change", onChange);
			else mq.removeListener(onChange as any);
		};
	}, []);

	// Handle the typing animation
	useEffect(() => {
		// Clear any existing timers
		clearTimers();

		if (reduced) {
			setDisplay(text);
			return;
		}

		// Start with empty display
		setDisplay("");
		setCursorVisible(true);

		// Helper function to type out text character by character
		const typeText = (startIndex = 0, delay = 0) => {
			const startTimer = addTimer(
				window.setTimeout(() => {
					let currentIndex = startIndex;

					const typingInterval = window.setInterval(() => {
						if (currentIndex < text.length) {
							setDisplay(text.slice(0, currentIndex + 1));
							currentIndex++;
						} else {
							window.clearInterval(typingInterval);

							// Call onComplete callback if provided
							if (onComplete) {
								onComplete();
							}

							// If looping is enabled, wait loopDelay ms and then restart
							if (loop) {
								// Optional: blink cursor during pause
								if (loopDelay > 0) {
									const blinkCursor = () => {
										setCursorVisible(false);
										addTimer(
											window.setTimeout(
												() => setCursorVisible(true),
												400
											)
										);
									};

									// Blink a few times during the loop delay
									const blinkCount = Math.floor(
										loopDelay / 1000
									);
									for (let i = 0; i < blinkCount; i++) {
										addTimer(
											window.setTimeout(
												blinkCursor,
												i * 800
											)
										);
									}
								}

								// After loopDelay, clear and restart
								addTimer(
									window.setTimeout(() => {
										setDisplay("");
										typeText(0, 0); // Restart typing with no additional delay
									}, loopDelay)
								);
							}
						}
					}, speed);

					// Store interval ID for cleanup
					addTimer(typingInterval);
				}, delay)
			);
		};

		// Start the initial typing animation after startDelay
		typeText(0, startDelay);

		// Clean up all timers on unmount or when dependencies change
		return clearTimers;
	}, [text, speed, startDelay, loop, loopDelay, reduced]);

	return (
		<span className={className}>
			{display}
			{!reduced && showCursor && cursorVisible ? (
				<Cursor className="align-middle h-5 w-1" />
			) : null}
		</span>
	);
}
