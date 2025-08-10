"use client";

import { ReactNode } from "react";
import { motion, Variants } from "framer-motion";

type AnimationDirection = "up" | "down" | "left" | "right" | "none";

interface MotionWrapperProps {
	children: ReactNode;
	direction?: AnimationDirection;
	delay?: number;
	duration?: number;
	className?: string;
	once?: boolean;
}

// Animation variants
const getVariants = (
	direction: AnimationDirection,
	duration: number
): Variants => {
	const baseVariants: Variants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { duration, ease: "easeOut" } },
	};

	// Add direction-specific animations
	switch (direction) {
		case "up":
			baseVariants.hidden = { ...baseVariants.hidden, y: 40 };
			baseVariants.visible = { ...baseVariants.visible, y: 0 };
			break;
		case "down":
			baseVariants.hidden = { ...baseVariants.hidden, y: -40 };
			baseVariants.visible = { ...baseVariants.visible, y: 0 };
			break;
		case "left":
			baseVariants.hidden = { ...baseVariants.hidden, x: 40 };
			baseVariants.visible = { ...baseVariants.visible, x: 0 };
			break;
		case "right":
			baseVariants.hidden = { ...baseVariants.hidden, x: -40 };
			baseVariants.visible = { ...baseVariants.visible, x: 0 };
			break;
		default:
			// No direction animation, just fade
			break;
	}

	return baseVariants;
};

export function MotionWrapper({
	children,
	direction = "up",
	delay = 0,
	duration = 0.5,
	className = "",
	once = true,
}: MotionWrapperProps) {
	const variants = getVariants(direction, duration);

	return (
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once }}
			variants={variants}
			transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
			className={className}>
			{children}
		</motion.div>
	);
}
