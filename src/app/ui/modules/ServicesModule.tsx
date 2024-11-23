import React from "react";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { ServiceCard } from "@/app/ui/ServiceCard";

export default function ServicesModule({
	title,
	description,
	services,
}: {
	title?: string;
	description?: string;
	services: {
		_id: string;
		title: string;
		description: string;
		price: string;
		duration: string;
		points: string[];
		ctas?: Sanity.CTA[];
	}[];
}) {
	return (
		<section className="mx-auto w-full max-w-screen-xl px-1 py-12 md:px-4">
			{title && (
				<Typography as="h2" variant="h3" className="mb-4 text-center">
					{title}
				</Typography>
			)}
			{description && (
				<Typography as="p" variant="body1" className="mb-8 text-center">
					{description}
				</Typography>
			)}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{services.map((service) => (
					<ServiceCard key={service._id} {...service} />
				))}
			</div>
		</section>
	);
}
