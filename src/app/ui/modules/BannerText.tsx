"use client";
import { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function BannerText({
	title,
	texts = [],
	ctas,
	displayType = "switch",
}: Partial<{
	title: string;
	texts: string[];
	ctas: Sanity.CTA[];
	displayType: "switch" | "slide";
}>) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const containerRef = useRef<HTMLDivElement>(null);

	const cleanedDisplayType = displayType
		.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();

	// Handle text switching logic (for "switch" mode)
	useEffect(() => {
		if (cleanedDisplayType === "switch" && texts.length > 1) {
			const interval = setInterval(() => {
				setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
			}, 3000); // Change text every 3 seconds
			return () => clearInterval(interval);
		}
	}, [cleanedDisplayType, texts]);

	return (
		<section
			className={cn(
				"relative mx-auto overflow-hidden bg-background-secondary p-3 py-3 text-center text-foreground-secondary",
			)}
		>
			<div className="mx-auto w-full px-1 md:px-4">
				{title && (
					<Typography variant="h3" className={cn("mb-2 text-foreground-secondary")}>
						{title}
					</Typography>
				)}

				{/* Text Rendering Based on Display Type */}
				{texts.length > 0 && cleanedDisplayType === "switch" && (
					<Typography
						key={currentIndex}
						variant="body1"
						className={cn("text-center text-foreground-secondary")}
					>
						{texts[currentIndex]}
					</Typography>
				)}

				{texts.length > 0 && cleanedDisplayType === "slide" && (
					<div className="relative flex w-full overflow-hidden" ref={containerRef}>
						<Marquee>
							{texts.map((text, index) => (
								<div key={`text-${index}`} className="flex items-center">
									<Typography variant="body1" className="px-8 text-foreground-secondary">
										{text}
									</Typography>
									<Typography
										key={`dot-${index}`}
										variant="body1"
										className="px-6 text-foreground-secondary md:px-12"
									>
										•
									</Typography>
								</div>
							))}
						</Marquee>
					</div>
				)}

				{ctas && <CTAList ctas={ctas} className="mt-4" />}
			</div>
		</section>
	);
}
