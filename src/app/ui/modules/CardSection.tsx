// CardSection.tsx
import React from "react";
import Card from "@/app/ui/Card";
import { cn } from "@/lib/utils";

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
				"w-full px-4 py-12",
			)}
		>
			<div className={cn("mx-auto max-w-screen-xl px-4")}>
				<div className="mb-12 text-center">
					<h2 className="mb-2 text-3xl font-medium">{title}</h2>
					{subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
				</div>
				<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{cards?.map((card, index) => (
						<Card
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
