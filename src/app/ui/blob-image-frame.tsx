"use client";

import React from "react";
import { useNextSanityImage } from "next-sanity-image";
import { roundedBlobs } from "@/lib/blob-paths";
import client from "@/lib/sanity/client";

function getRandomValues(values: string[], count: number): string {
	const selectedValues = values.slice(0, count);

	if (selectedValues.length > 0) {
		selectedValues.push(selectedValues[0]);
	}

	return selectedValues.join("; ");
}

interface ImageBlobFrameProps {
	image: Sanity.Image | undefined;
}

const ImageBlobFrame: React.FC<ImageBlobFrameProps> = ({ image }) => {
	if (!image?.asset) return null;
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { src } = useNextSanityImage(client, image);

	return (
		<div className="relative mx-auto aspect-square min-h-[300px] w-full max-w-[450px] flex-1 flex-col items-stretch overflow-hidden">
			<div
				className="absolute inset-0 h-full w-full"
				style={{
					clipPath: "url(#blobClipPath)",
					backgroundImage: `url(${src})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					WebkitClipPath: "url(#blobClipPath)",
				}}
			></div>
			<svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200">
				<defs>
					<clipPath id="blobClipPath" clipPathUnits="objectBoundingBox">
						<path transform="scale(0.0021, 0.0021)">
							<animate
								// style={{ width: "100%", height: "100%" }}
								attributeName="d"
								dur="32000ms"
								repeatCount="indefinite"
								values={getRandomValues(roundedBlobs, 8)}
							></animate>
						</path>
					</clipPath>
				</defs>
			</svg>
		</div>
	);
};

export { ImageBlobFrame };
