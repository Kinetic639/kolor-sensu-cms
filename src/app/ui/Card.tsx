import React from "react";
import Img from "@/app/ui/Img";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

interface CardProps {
	title: string;
	image: Sanity.Image;
	frontText: string;
	hoverText?: string;
	faqList?: Sanity.FAQList;
}

export default function Card({ title, image, frontText, faqList }: CardProps) {
	return (
		<div className="group relative overflow-hidden rounded-lg">
			{image?.asset && (
				<Img
					image={image}
					imageWidth={500}
					className="h-34 aspect-square w-full bg-background object-cover transition-transform duration-300 group-hover:scale-110"
					alt={image?.alt || "Card Image"}
				/>
			)}

			<div className="bg-white p-4">
				<h3 className="text-xl font-bold">{title}</h3>
				<p>{frontText}</p>
				{faqList && (
					<div className="mt-4 text-sm text-gray-500">
						<ul>
							{faqList.items.map((faqItem, index) => (
								<Accordion type="single" collapsible key={index}>
									<AccordionItem value="item-1">
										<AccordionTrigger>{faqItem.question}</AccordionTrigger>
										<AccordionContent>{faqItem.answer}</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}
