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
				"relative py-12",
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

			<div className="relative z-10 mx-auto grid max-w-screen-xl items-stretch gap-6 px-4 py-16 md:grid-cols-2">
				<div className="flex max-w-[80%] flex-col gap-8 self-center">
					{/* Main Content */}
					{pretitle && (
						<Typography
							as="h3"
							variant="h3"
							className="mb-4 text-left font-bold text-foreground-hover md:text-left"
						>
							{pretitle}
						</Typography>
					)}
					<PortableText value={content} components={customPortableTextComponents} />
					{ctas && <CTAList ctas={ctas} className="mt-8" />}
				</div>

				{/* Image Section with Hovering Card */}
				<div className="relative">
					{image?.asset && (
						<Img
							image={image}
							imageWidth={1200}
							alt={image?.alt || "Main Image"}
							className="rounded-lg shadow-lg"
						/>
					)}

					{card && (
						<motion.div className="absolute -left-20 top-24 w-[260px] max-w-sm rounded-2xl bg-white p-3 shadow-xl">
							{card.title && (
								<Typography
									as="h3"
									variant="h5"
									className="mb-4 text-center font-bold text-purple-700"
								>
									{card.title}
								</Typography>
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
												className="h-8 w-8"
											/>
										)}
										<span className="text-sm">{item.text}</span>
									</li>
								))}
							</ul>
						</motion.div>
					)}
				</div>
			</div>
		</section>
	);
}
