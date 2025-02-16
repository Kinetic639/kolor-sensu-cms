"use client";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function BannerText({
	title,
	texts,
	ctas,
	displayType = "switch",
}: Partial<{
	title: string;
	texts: string[];
	ctas: Sanity.CTA[];
	displayType: "switch" | "slide";
}>) {
	const [currentIndex, setCurrentIndex] = useState(0);

	const cleanedDisplayType = displayType
		.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();

	useEffect(() => {
		if (cleanedDisplayType === "switch" && texts && texts.length > 1) {
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
				{texts && cleanedDisplayType === "switch" && (
					<Typography
						key={currentIndex}
						variant="body1"
						className={cn("text-center text-foreground-secondary")}
					>
						{texts[currentIndex]}
					</Typography>
				)}
				{texts && cleanedDisplayType === "slide" && (
					<div className="relative flex h-[30px] overflow-hidden">
						<div
							className="animate-slide-infinite flex"
							style={{
								animationDuration: `${texts.length * 3}s`, // Adjust speed based on number of texts
							}}
						>
							{texts.map((text, index) => (
								<Typography
									key={index}
									variant="body1"
									className={cn("whitespace-nowrap px-4 text-foreground-secondary")}
								>
									{text}
								</Typography>
							))}
						</div>
					</div>
				)}

				{ctas && <CTAList ctas={ctas} className="mt-4" />}
			</div>
		</section>
	);
}
