"use client";

import React, { useRef } from "react";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { FlipCard } from "@/app/ui/atoms/flip-card";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { MotionDiv } from "@/app/ui/motion/MotionDiv";
import "./cardSection.css";

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
			className={cn(fullscreen && "bg-multi-gradient", "w-full px-4")}
		>
			<div className="relative w-full overflow-hidden bg-gray-800 text-white">
				<div className="animate-scroll absolute right-0 top-0 whitespace-nowrap">
					<span className="px-4">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur laborum odio nemo
						dignissimos in doloremque quo quidem, molestias temporibus illo tempore iste. Quidem
						assumenda rerum, corrupti laboriosam nobis qui facilis.
					</span>
				</div>
			</div>
			<div className={cn("mx-auto max-w-screen-xl px-4 pb-12")}>
				<MotionDiv
					className="mb-16 text-center"
					variants={containerVariants}
					initial="initial"
					animate={isInView ? "animate" : "initial"} // Trigger animation when in view
				>
					{title && (
						<MotionDiv variants={childVariants}>
							<Typography as="h3" variant="h3" className="mb-5">
								{title}
							</Typography>
						</MotionDiv>
					)}
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
