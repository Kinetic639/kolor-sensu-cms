"use client";
import React from "react";
import { motion } from "framer-motion";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
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
	backgroundImageMobile,
}: Partial<{
	heading: PortableTextBlock[];
	subheading: string;
	items: { icon: Sanity.Image; text: string }[];
	image: Sanity.Image & { alt?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
	backgroundOverlap: boolean;
	backgroundImageMobile: Sanity.Image;
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
				<div className="absolute left-0 top-0 h-full w-full md:bottom-0 md:h-auto">
					{
						<>
							<div className="absolute bottom-0 left-1/2 hidden h-[120%] w-[100%] -translate-x-1/2 items-end md:flex">
								<Img
									image={backgroundImage}
									alt="Background"
									className="h-full w-full object-cover object-top md:block"
								/>
							</div>
							<div className="h-full md:hidden">
								<Img
									image={backgroundImageMobile}
									alt="Background"
									className="h-full w-full object-cover object-top md:block"
								/>
							</div>
						</>
					}
				</div>
			)}

			<div className="relative mx-auto flex max-w-screen-xl items-stretch gap-8 px-4 py-16 pb-28">
				{/* Left Section (Image with Stones) */}
				<div className="flex">
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
								className="max-w-[55vw] sm:max-w-[60vw] md:max-w-[400px]"
							/>
						)}
						{/* Heading and Subheading */}
						<div className="mt-4 md:hidden">
							{heading && (
								<Typography
									as="h3"
									variant={"h1"}
									className={cn(
										"text-left text-3xl font-bold text-foreground-secondary sm:text-4xl",
									)}
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
							{subheading && <p className="mt-4 text-xl text-gray-600 sm:text-2xl">{subheading}</p>}
						</div>
					</motion.div>
				</div>

				{/* Right Section (Text and Icons) */}
				<motion.div
					initial={{ opacity: 0, x: 50 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="flex flex-1 flex-col justify-end gap-y-6"
				>
					{/* Heading and Subheading */}
					<div className="hidden md:block">
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
					<ul className="flex w-full flex-col flex-wrap justify-between max-sm:flex-1 max-sm:gap-y-8 md:flex-row">
						{items?.map((item, idx) => (
							<li key={idx} className="flex max-w-24 flex-col items-center">
								{/* Icon */}
								{item.icon?.asset && (
									<Img
										image={item.icon}
										imageWidth={64}
										alt={`Icon for ${item.text}`}
										className="h-16 w-16 object-contain sm:h-20 sm:w-20"
									/>
								)}
								{/* Text */}
								<p className="text-center text-xs font-medium text-secondary sm:text-sm">
									{item.text}
								</p>
							</li>
						))}
					</ul>
				</motion.div>
			</div>
		</section>
	);
}
