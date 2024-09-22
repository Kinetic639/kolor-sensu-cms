import React from "react";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import CTAList from "@/app/ui/CTAList";

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
		<section className="mx-auto w-full max-w-screen-xl px-1 pb-12 md:px-4">
			{title && (
				<Typography as="h2" variant="h3" className="mb-4">
					{title}
				</Typography>
			)}
			{description && (
				<Typography as="p" variant="body1" className="mb-8">
					{description}
				</Typography>
			)}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{services.map((service) => (
					<div
						key={service._id}
						className="flex flex-col justify-between rounded-lg border border-gray-300 p-4"
					>
						<Typography as="h3" variant="h4" className="mb-2">
							{service.title}
						</Typography>
						<Typography as="p" variant="body2" className="mb-4">
							{service.description}
						</Typography>
						<ul className="mb-4 list-disc pl-4">
							{service.points.map((point, index) => (
								<li key={index}>{point}</li>
							))}
						</ul>
						<Typography as="p" variant="h4" className="text-center">
							{service.price}zł / {service.duration}
						</Typography>
						<div className="flex justify-center">
							<CTAList ctas={service.ctas} className="mt-8" />
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
