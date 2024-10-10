"use client";

import React, { type FC } from "react";
import { ReactLenis } from "@studio-freight/react-lenis";

interface SmoothScrollingProps {
	children: React.ReactNode;
}

export const SmoothScrolling: FC<SmoothScrollingProps> = ({ children }) => {
	return (
		<ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
			{children}
		</ReactLenis>
	);
};
