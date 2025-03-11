"use client";
import React, { type FC, useRef } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { cn } from "@/lib/utils";

interface AnimatedLottieProps {
	className?: string;
	animationData: unknown;
	loop?: boolean;
}
export const AnimatedLottie: FC<AnimatedLottieProps> = ({
	className,
	animationData,
	loop = false,
}) => {
	const animationRef = useRef<LottieRefCurrentProps | null>(null);
	return (
		<div className={cn("flex items-center justify-center overflow-hidden", className)}>
			<Lottie
				lottieRef={animationRef}
				animationData={animationData}
				loop={loop}
				className="scale-150"
			/>
		</div>
	);
};
