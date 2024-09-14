// Card.tsx
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

export default function Card({ title, image, frontText, hoverText, faqList }: CardProps) {
	console.log(faqList);
	return (
		<div className="group relative overflow-hidden rounded-lg">
			{/* Card Image */}
			{image?.asset && (
				<Img
					image={image}
					imageWidth={500}
					className="h-34 aspect-square w-full bg-background object-cover transition-transform duration-300 group-hover:scale-110"
				/>
			)}

			{/*/!* Card Content *!/*/}
			{/*<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">*/}
			{/*	<div>*/}
			{/*		/!* Title *!/*/}
			{/*		<h3 className="mb-4 text-xl font-bold text-white">{title}</h3>*/}

			{/*		/!* Front Text / Hover Text *!/*/}
			{/*		{hoverText ? (*/}
			{/*			<p className="text-white">{hoverText}</p>*/}
			{/*		) : (*/}
			{/*			<p className="text-white">{frontText}</p>*/}
			{/*		)}*/}

			{/*		/!* FAQ List (Optional) *!/*/}
			{/*	</div>*/}
			{/*</div>*/}

			{/* Non-hover content */}
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
