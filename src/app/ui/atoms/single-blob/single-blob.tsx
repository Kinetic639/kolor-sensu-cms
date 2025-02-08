"use client";

import React from "react";
import "./styles.css";
import { roundedBlobs } from "@/lib/blob-paths";

function getRandomValues(values: string[], count: number): string {
	const selectedValues = values.slice(0, count);

	if (selectedValues.length > 0) {
		selectedValues.push(selectedValues[0]);
	}

	return selectedValues.join("; ");
}

export const SingleBlob = () => {
	return (
		<div className="absolute left-0 top-0 z-[10] h-full w-full">
			<svg
				viewBox="0 0 500 500"
				xmlns="http://www.w3.org/2000/svg"
				className="absolute bottom-[20%] right-[70%] scale-[2.5] max-sm:bottom-[40%] max-sm:right-[40%] max-sm:scale-[3]"
			>
				<defs>
					<linearGradient id="one" x1="0%" y1="10%" x2="30%" y2="100%">
						<stop offset="0%" style={{ stopColor: `#314552` }}></stop>
						<stop offset="50%" style={{ stopColor: `#314552` }}></stop>
						<stop offset="100%" style={{ stopColor: `#314552` }}></stop>
					</linearGradient>
				</defs>
				<path fill="url(#one)">
					<animate
						attributeName="d"
						dur="32000ms"
						repeatCount="indefinite"
						values={getRandomValues(roundedBlobs, 8)}
					></animate>
				</path>
			</svg>
		</div>
	);
};
