"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoaderProps {
	onComplete?: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
	const [progress, setProgress] = useState(0);
	const [showLoader, setShowLoader] = useState(true);

	useEffect(() => {
		// Simulate loading progress
		const interval = setInterval(() => {
			setProgress((prev) => {
				const newProgress = prev + Math.random() * 15;
				return newProgress >= 100 ? 100 : newProgress;
			});
		}, 150);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		if (progress === 100) {
			// Once progress reaches 100%, wait a bit and then fade out
			const timeout = setTimeout(() => {
				setShowLoader(false);
				if (onComplete) {
					onComplete();
				}
			}, 500);

			return () => clearTimeout(timeout);
		}
	}, [progress, onComplete]);

	return (
		<motion.div
			className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
			animate={{
				opacity: showLoader ? 1 : 0,
				y: showLoader ? 0 : -20,
			}}
			transition={{ duration: 0.6, ease: "easeInOut" }}
			onAnimationComplete={() => {
				if (!showLoader && onComplete) {
					onComplete();
				}
			}}>
			<div className="space-y-8 text-center">
				<motion.div
					initial={{ scale: 0.8, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="flex flex-col items-center justify-center">
					<motion.div
						className="text-3xl md:text-4xl font-bold font-mono text-emerald-600 dark:text-emerald-400"
						animate={{ opacity: [0.5, 1, 0.5] }}
						transition={{
							duration: 1.5,
							repeat: Infinity,
							ease: "easeInOut",
						}}>
						{`< SoumyaRaj />`}
					</motion.div>
					<motion.div
						className="text-sm text-muted-foreground mt-2"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.3 }}>
						Portfolio Loading
					</motion.div>
				</motion.div>

				<div className="w-64 md:w-80">
					<div className="h-1 bg-muted rounded-full overflow-hidden">
						<motion.div
							className="h-full bg-emerald-600 dark:bg-emerald-400"
							initial={{ width: "0%" }}
							animate={{ width: `${progress}%` }}
							transition={{ ease: "easeInOut" }}
						/>
					</div>
					<div className="flex justify-between mt-2">
						<span className="text-xs text-muted-foreground">
							Initializing
						</span>
						<span className="text-xs font-mono text-muted-foreground">
							{Math.round(progress)}%
						</span>
					</div>
				</div>

				<motion.div
					className="flex gap-2 justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.5 }}>
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className="w-2 h-2 rounded-full bg-emerald-600/60 dark:bg-emerald-400/60"
							animate={{ scale: [0.5, 1, 0.5] }}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: i * 0.2,
								ease: "easeInOut",
							}}
						/>
					))}
				</motion.div>
			</div>
		</motion.div>
	);
}
