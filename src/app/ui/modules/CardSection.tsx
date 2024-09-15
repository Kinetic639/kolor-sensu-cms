import React from "react";
import { cn } from "@/lib/utils";
import { FlipCard } from "@/app/ui/atoms/flip-card";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

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
	return (
		<section
			className={cn(
				fullscreen && "bg-gradient-to-br from-[#c4d4d9] to-[#688d62]",
				"w-full px-4 py-4 md:py-16",
			)}
		>
			<div className={cn("mx-auto max-w-screen-xl px-4")}>
				<div className="mb-16 text-center">
					<Typography as="h3" variant="h3" className="mb-3">
						{title}
					</Typography>
					{subtitle && (
						<Typography as="p" variant="body1">
							{subtitle}
						</Typography>
					)}
				</div>
				<div className="grid grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{cards?.map((card, index) => (
						<FlipCard
							key={index}
							title={card.title}
							image={card.image}
							frontText={card.frontText}
							hoverText={card.hoverText}
							faqList={card.faqList}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
