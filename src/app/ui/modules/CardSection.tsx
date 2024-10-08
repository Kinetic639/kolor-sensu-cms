"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipCard } from "@/app/ui/atoms/flip-card";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { MotionDiv } from "@/app/ui/motion/MotionDiv";

const containerVariants = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { staggerChildren: 0.3 },
	},
};

const childVariants = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 2, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function CardSection({
	title,
	subtitle,
	fullscreen = false,
	cards,
}: Partial<{
	title: string;
	subtitle?: string;
	fullscreen?: boolean;
	cards: Array<Sanity.Card>;
}>) {
	// Set up the ref and useInView hook
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	return (
		<section
			ref={sectionRef} // Attach ref to the section
			className={cn(
				fullscreen && "bg-gradient-to-br from-[#c4d4d9] to-[#688d62]",
				"w-full px-4 py-4 md:py-16",
			)}
		>
			<div className={cn("mx-auto max-w-screen-xl px-4")}>
				<MotionDiv
					className="mb-16 text-center"
					variants={containerVariants}
					initial="initial"
					animate={isInView ? "animate" : "initial"} // Trigger animation when in view
				>
					<MotionDiv variants={childVariants}>
						<Typography as="h3" variant="h3" className="mb-3">
							{title}
						</Typography>
					</MotionDiv>
					{subtitle && (
						<MotionDiv variants={childVariants}>
							<Typography as="p" variant="body1">
								{subtitle}
							</Typography>
						</MotionDiv>
					)}
				</MotionDiv>

				<MotionDiv
					className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3"
					variants={containerVariants}
					initial="initial"
					animate={isInView ? "animate" : "initial"} // Trigger animation when in view
				>
					{cards?.map((card, index) => (
						<MotionDiv
							key={index}
							variants={childVariants}
							className="perspective-1000 min-h-[450px] w-full min-w-[300px] max-w-[340px] cursor-pointer"
						>
							<FlipCard
								title={card.title}
								image={card.image}
								frontText={card.frontText}
								hoverText={card.hoverText}
								faqList={card.faqList}
							/>
						</MotionDiv>
					))}
				</MotionDiv>
			</div>
		</section>
	);
}
