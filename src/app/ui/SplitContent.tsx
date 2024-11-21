"use client";
import React from "react";
import { motion } from "framer-motion";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";

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
				"relative px-4 py-16 md:py-24",
				backgroundType === "solid" && "bg-gray-100",
				backgroundType === "wavy" && "relative bg-white",
				backgroundOverlap && "mt-[-4rem]", // Overlap with previous section
			)}
		>
			{/* Wavy Background Image */}
			{backgroundType === "wavy" && backgroundImage?.asset && (
				<Img
					image={backgroundImage}
					imageWidth={1800}
					alt="Wavy Background"
					className="absolute inset-0 z-[-1] h-full w-full object-cover"
				/>
			)}

			<div className="relative mx-auto grid max-w-screen-xl items-center gap-8 md:grid-cols-2">
				{/* Left Image */}
				<motion.div
					initial={{ opacity: 0, x: -50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
				>
					{image?.asset && (
						<Img
							image={image}
							imageWidth={800}
							alt={image.alt || "Image"}
							className="rounded-md shadow-lg"
						/>
					)}
				</motion.div>

				{/* Right Content */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="space-y-6"
				>
					{heading && <h2 className="text-3xl font-bold">{heading}</h2>}
					{subheading && <p className="text-lg text-gray-600">{subheading}</p>}

					{/* Items with Icons */}
					<ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
						{items?.map((item, idx) => (
							<li key={idx} className="flex flex-col items-center text-center">
								{item.icon?.asset && (
									<Img
										image={item.icon}
										imageWidth={80}
										alt={`Icon for ${item.text}`}
										className="mb-2"
									/>
								)}
								<p className="text-sm font-medium text-gray-700">{item.text}</p>
							</li>
						))}
					</ul>
				</motion.div>
			</div>
		</section>
	);
}
