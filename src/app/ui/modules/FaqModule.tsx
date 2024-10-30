import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import Img from "@/app/ui/Img";

export default function FAQModule({
	title,
	description,
	showTitle,
	showDescription,
	showImage,
	image,
	faqNavigation,
}: {
	title?: string;
	description?: string;
	showTitle?: boolean;
	showDescription?: boolean;
	showImage?: boolean;
	image?: { asset: { url: string }; alt?: string };
	faqNavigation?: {
		items: { question: string; answer: string }[];
	};
}) {
	const hasFAQItems = faqNavigation?.items && faqNavigation.items.length > 0;
	return (
		<section className="mx-auto flex max-w-screen-xl flex-col px-2 py-12">
			<div className="w-full px-1 md:px-4">
				<div className="mb-4 flex flex-col gap-1 text-center">
					{showTitle && (
						<Typography as="h2" variant="h3">
							{title}
						</Typography>
					)}
					{showDescription && (
						<Typography as="p" variant="body1">
							{description}
						</Typography>
					)}
				</div>
				<div className="flex w-full flex-wrap items-center justify-evenly gap-12">
					{hasFAQItems && (
						<Accordion type="multiple" className="flex-1 text-foreground">
							{faqNavigation.items.map((faqItem, index) => (
								<AccordionItem
									value={`item-${index}`}
									key={index}
									className="border-b border-gray-300 p-1"
								>
									<AccordionTrigger className="text-left hover:text-background-secondary">
										{faqItem.question}
									</AccordionTrigger>
									<AccordionContent className="md:pl-4">{faqItem.answer}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					)}
					{showImage && (
						<div className="hidden min-w-80 max-w-screen-sm items-center justify-center md:flex">
							<Img
								className="aspect-sqare w-full max-w-[400px] object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
								image={image}
								imageWidth={400}
								alt={image?.alt || "FAQ grafika"}
							/>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
