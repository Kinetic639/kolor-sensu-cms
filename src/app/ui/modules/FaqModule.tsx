import React from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import Img from "@/app/ui/Img";

interface FAQModuleProps {
	title?: string;
	description?: string;
	showTitle?: boolean;
	showDescription?: boolean;
	showImage?: boolean;
	image?: { asset: { url: string }; alt?: string };
	faqNavigations?: {
		_key: string;
		showTitle: boolean;
		navigation?: {
			_id: string;
			title: string;
			items?: { _key: string; question: string; answer: string }[];
		};
	}[];
	footerHeading?: string;
	footerText?: string;
}

export default function FAQModule({
	title,
	description,
	showTitle = true,
	showDescription = true,
	showImage = true,
	image,
	faqNavigations = [],
	footerHeading,
	footerText,
}: FAQModuleProps) {
	// Check if there's any FAQ data available
	const hasFAQs = faqNavigations.length > 0;
	const hasImage = showImage && image?.asset?.url;

	return (
		<section className="mx-auto max-w-screen-xl px-4 py-12">
			{/* Section Header */}
			<div className="mb-10 text-center">
				{showTitle && title && (
					<Typography as="h2" variant="h4" className="text-center">
						{title}
					</Typography>
				)}
				{showDescription && description && (
					<Typography as="p" variant="body1" className="mx-auto mt-2 max-w-3xl">
						{description}
					</Typography>
				)}
			</div>

			{/* FAQ Content */}
			<div
				className={`flex flex-wrap items-start justify-between gap-12 ${!hasImage ? "justify-center" : ""}`}
			>
				{/* FAQ List */}
				<div className={`w-full ${!hasImage ? "mx-auto max-w-screen-lg" : "max-w-3xl"} flex-1`}>
					{hasFAQs ? (
						faqNavigations.map((faqNav) => {
							const { _key, showTitle, navigation } = faqNav;
							const hasFAQItems = navigation?.items && navigation.items.length > 0;

							return (
								<div key={_key} className="mb-6 pb-6">
									{showTitle && navigation?.title && (
										<Typography as="h3" variant="h5" className="mb-4">
											{navigation.title}
										</Typography>
									)}
									{hasFAQItems && (
										<Accordion type="multiple" className="px-2 text-foreground md:px-6">
											{navigation?.items?.map((faqItem) => (
												<AccordionItem
													value={`faq-${_key}-${faqItem._key}`}
													key={faqItem._key}
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
							);
						})
					) : (
						<Typography as="p" variant="body1" className="text-center">
							No FAQs available at the moment.
						</Typography>
					)}
				</div>

				{/* Image Section */}
				{hasImage && (
					<div className="hidden min-w-80 max-w-screen-sm items-center justify-center md:flex">
						<Img
							className="w-full max-w-[400px] object-cover transition-transform group-hover:scale-105 group-hover:brightness-110"
							image={image}
							imageWidth={400}
							alt={image.alt || "FAQ Illustration"}
						/>
					</div>
				)}
			</div>

			{/* Footer Section */}
			{(footerHeading || footerText) && (
				<div className="mt-10 text-center">
					{footerHeading && (
						<Typography as="h3" variant="h5" className="mb-4 text-center">
							{footerHeading}
						</Typography>
					)}
					{footerText && (
						<Typography as="p" variant="body1" className="mx-auto mt-2 max-w-3xl text-center">
							{footerText}
						</Typography>
					)}
				</div>
			)}
		</section>
	);
}
