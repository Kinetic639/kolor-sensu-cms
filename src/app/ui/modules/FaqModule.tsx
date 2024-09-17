import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function FAQModule({
	title,
	description,
	showTitle,
	showDescription,
	faqNavigation,
}: {
	title?: string;
	description?: string;
	showTitle?: boolean;
	showDescription?: boolean;
	faqNavigation?: {
		items: { question: string; answer: string }[];
	};
}) {
	const hasFAQItems = faqNavigation?.items && faqNavigation.items.length > 0;

	return (
		<section className="pb-12">
			<div className="mx-auto w-full max-w-screen-xl px-1 md:px-4">
				<div className="mb-4 flex flex-col gap-1">
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
				{hasFAQItems && (
					<Accordion type="multiple" className="text-foreground">
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
			</div>
		</section>
	);
}
