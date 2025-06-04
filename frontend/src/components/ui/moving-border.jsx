/* eslint-disable react/prop-types */
"use client";
import {
	motion,
	useAnimationFrame,
	useMotionTemplate,
	useMotionValue,
	useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "../../service/utils";

export function Button({
	borderRadius = "1.75rem",
	children,
	as: Component = "button",
	containerClassName,
	borderClassName,
	duration,
	className,
	...otherProps
}) {
	return (
		<Component
			className={cn(
				"relative h-12 overflow-hidden bg-transparent p-[1px] text-xl",
				containerClassName
			)}
			style={{
				borderRadius: borderRadius,
			}}
			{...otherProps}
		>
			<div
				className="absolute inset-0"
				style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
			>
				<MovingBorder duration={duration} rx="30%" ry="30%">
					<div
						className={cn(
							"h-20 w-20 bg-[radial-gradient(#0ea5e9_40%,transparent_60%)] opacity-[0.8]",
							borderClassName
						)}
					/>
				</MovingBorder>
			</div>
			<div
				className={cn(
					"relative flex h-full w-full items-center justify-center border antialiased backdrop-blur-xl bg-white cursor-pointer dark:bg-neutral-950/[0.8] text-black dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 text-base md:text-lg",
					className
				)}
				style={{
					borderRadius: `calc(${borderRadius} * 0.96)`,
				}}
			>
				{children}
			</div>
		</Component>
	);
}

export const MovingBorder = ({
	children,
	duration = 3000,
	rx,
	ry,
	...otherProps
}) => {
	const pathRef = useRef();
	const progress = useMotionValue(0);

	useAnimationFrame((time) => {
		const length = pathRef.current?.getTotalLength();
		if (length) {
			const pxPerMillisecond = length / duration;
			progress.set((time * pxPerMillisecond) % length);
		}
	});

	const x = useTransform(
		progress,
		(val) => pathRef.current?.getPointAtLength(val).x
	);
	const y = useTransform(
		progress,
		(val) => pathRef.current?.getPointAtLength(val).y
	);

	const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

	return (
		<>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				preserveAspectRatio="none"
				className="absolute h-full w-full"
				width="100%"
				height="100%"
				{...otherProps}
			>
				<rect
					fill="none"
					width="100%"
					height="100%"
					rx={rx}
					ry={ry}
					ref={pathRef}
				/>
			</svg>
			<motion.div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					display: "inline-block",
					transform,
				}}
			>
				{children}
			</motion.div>
		</>
	);
};
