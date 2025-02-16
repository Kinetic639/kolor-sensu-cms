"use client";

import React from "react";
import { PortableText } from "@portabletext/react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img from "@/app/ui/Img";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { EdgeBlob } from "@/app/ui/atoms/edge-blob/edge-blob";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";

export default function HeroWithCard({
	pretitle,
	content,
	ctas,
	image,
	backgroundType,
	backgroundImage,
	card,
}: Partial<{
	pretitle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { alt?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
	card: { title: string; items: { icon: Sanity.Image; text: string }[] };
}>) {
	return (
		<section
			className={cn(
				"relative overflow-hidden pb-8",
				backgroundType === "solid" && "bg-white",
				backgroundType === "blob" && "relative",
			)}
		>
			{/* Render Background Image */}
			{backgroundImage?.asset && (
				<Img
					image={backgroundImage}
					imageWidth={1800}
					alt={backgroundImage?.alt || "Background Image"}
					className="absolute inset-0 z-[-1] h-full w-full object-cover"
				/>
			)}

			{/* Optional Blob Background */}
			{backgroundType === "blob" && <EdgeBlob />}

			<div className="md:pt16 relative z-10 mx-auto grid max-w-screen-xl items-stretch gap-6 overflow-hidden py-12 pt-32 md:grid-cols-2 md:px-4 md:py-16">
				<div className="relative order-1 px-4 pb-[400px] md:order-2 md:pb-0">
					{image?.asset && (
						<Img
							image={image}
							imageWidth={1200}
							alt={image?.alt || "Main Image"}
							className="absolute left-[90px] rounded-lg md:relative md:left-0"
						/>
					)}
					{card && (
						<motion.div className="absolute -top-[70px] left-[140px] w-[220px] max-w-sm -translate-x-1/2 transform rounded-2xl bg-white p-3 shadow-xl md:-left-20 md:top-24 md:w-[260px] md:-translate-x-1/2 md:transform-none">
							{card.title && (
								<h3 className="mb-3 text-center text-lg font-semibold text-[#636AE8]">
									{card.title}
								</h3>
							)}
							<ul className="flex flex-col gap-4">
								{card.items?.map((item, idx) => (
									<li
										key={idx}
										className={cn(
											"flex items-center gap-3 rounded-xl p-3 py-3",
											idx === 0 && "bg-[#F6F8F7] text-foreground-hover",
											idx === 1 && "bg-[#F4F4FB] text-[#9593D9]",
											idx === 2 && "bg-[#FEF9EE] text-[#98690C]",
										)}
									>
										{item.icon?.asset && (
											<Img
												image={item.icon}
												imageWidth={32}
												alt={`Icon for ${item.text}`}
												className="h-6 w-6 md:h-8 md:w-8"
											/>
										)}
										<span className="text-sm md:text-base">{item.text}</span>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</div>

				<div className="order-2 flex flex-col gap-8 self-center px-4 md:order-1 md:max-w-[80%]">
					{/* Main Content */}
					{pretitle && (
						<Typography
							as="h3"
							variant="h3"
							className="text-left text-2xl font-bold text-foreground-hover md:text-3xl"
						>
							{pretitle}
						</Typography>
					)}
					<PortableText value={content} components={customPortableTextComponents} />
					{ctas && <CTAList ctas={ctas} className="mt-8" />}
				</div>
			</div>
		</section>
	);
}
