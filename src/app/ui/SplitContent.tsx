"use client";
import React from "react";
import { motion } from "framer-motion";
import { PortableText } from "@portabletext/react";
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
	heading: any[];
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
				"relative",
				backgroundType === "solid" && "bg-gray-100",
				backgroundType === "wavy" && "bg-white",
			)}
			style={{
				marginTop: backgroundOverlap ? "-4rem" : undefined,
			}}
		>
			{/* Add Background Wave Image */}
			{backgroundType === "wavy" && backgroundImage?.asset && (
				<div className="absolute bottom-0 right-0 h-[120%] w-full">
					<Img
						image={backgroundImage}
						imageWidth={4360}
						alt=""
						className="absolute right-0 top-0 h-full w-full"
					/>
				</div>
			)}

			<div className="relative mx-auto grid max-w-screen-xl items-stretch gap-8 px-4 py-16 pb-28 md:grid-cols-5">
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
					className="flex flex-col justify-end space-y-12 pb-16 md:col-span-3"
				>
					{/* Heading and Subheading */}
					<div>
						{heading && (
							<Typography
								as="h3"
								variant={"h3"}
								className={cn("mb-4 text-right font-bold text-foreground-secondary")}
							>
								<PortableText
									value={heading}
									components={{
										block: ({ children }) => <>{children}</>,
										marks: {
											break: () => <br />,
										},
									}}
								/>
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
