"use client";
import React from "react";
import { motion } from "framer-motion";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function SplitContent({
	heading,
	subheading,
	items,
	image,
	backgroundType = "wavy",
	backgroundImage,
	backgroundOverlap = false,
}: Partial<{
	heading: string;
	subheading: string;
	items: { icon: Sanity.Image; text: string }[];
	image: Sanity.Image & { alt?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
	backgroundOverlap: boolean;
}>) {
	return (
		<section
			className={cn(
				"relative min-h-[800px] px-4",
				backgroundType === "solid" && "bg-gray-100",
				backgroundType === "wavy" && "bg-white",
			)}
			style={{
				marginTop: backgroundOverlap ? "-4rem" : undefined,
			}}
		>
			{/* Wavy Background */}
			{backgroundType === "wavy" && backgroundImage?.asset && (
				<div className="absolute bottom-0 left-0 w-full" style={{ zIndex: 0 }}>
					<Img
						image={backgroundImage}
						imageWidth={1800}
						alt="Wavy Background"
						className="h-auto w-full object-cover"
					/>
				</div>
			)}

			<div className="relative mx-auto grid max-w-screen-xl items-stretch gap-8 px-4 py-24 pb-44 md:grid-cols-5">
				{/* Left Section (Image with Stones) */}
				<div className="flex justify-center md:col-span-2">
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
					>
						{image?.asset && (
							<Img
								image={image}
								imageWidth={1800}
								alt={image.alt || "Stones Image"}
								className="max-w-[500px] md:max-w-[700px]"
							/>
						)}
					</motion.div>
				</div>

				{/* Right Section (Text and Icons) */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-col justify-end space-y-12 md:col-span-3"
				>
					{/* Heading and Subheading */}
					<div>
						{heading && (
							<Typography
								as="h3"
								variant={"h2"}
								className={cn(
									"mb-4 text-right font-bold text-foreground-secondary",
									// image?.onRight ? "md:text-right" : "md:text-left",
								)}
							>
								{heading}
							</Typography>
						)}
						{subheading && <p className="mt-4 text-lg text-gray-600">{subheading}</p>}
					</div>

					{/* Icons with Text */}
					<ul className="flex w-fit flex-wrap justify-between gap-6 self-end">
						{items?.map((item, idx) => (
							<li key={idx} className="flex max-w-28 flex-col items-center">
								{/* Icon */}
								{item.icon?.asset && (
									<Img
										image={item.icon}
										imageWidth={82}
										alt={`Icon for ${item.text}`}
										className="mb-2 h-20 w-20 object-contain"
									/>
								)}
								{/* Text */}
								<p className="text-center text-sm font-medium text-secondary">{item.text}</p>
							</li>
						))}
					</ul>
				</motion.div>
			</div>
		</section>
	);
}
