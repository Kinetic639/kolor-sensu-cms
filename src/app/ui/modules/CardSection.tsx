// CardSection.tsx
import React from "react";
import Card from "@/app/ui/Card";

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
		<section className={fullscreen ? "w-full" : "container mx-auto px-4 py-4"}>
			<div className="mb-8 text-center">
				<h2 className="text-3xl font-bold">{title}</h2>
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
		</section>
	);
}
