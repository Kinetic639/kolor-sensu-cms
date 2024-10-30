import React from "react";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import CTAList from "@/app/ui/CTA/CTAList";
import { cn } from "@/lib/utils"; // Helper function for conditionally combining class names

export function ServiceCard({
	_id,
	title,
	description,
	price,
	duration,
	points,
	ctas,
}: {
	_id: string;
	title: string;
	description: string;
	price: string;
	duration: string;
	points: string[];
	ctas?: Sanity.CTA[];
}) {
	return (
		<div
			className={cn(
				"flex flex-col justify-between gap-8 rounded-lg border px-6 py-10 md:p-10",
				"from-servicecard to-servicecard-dark bg-gradient-to-br", // Updated gradient colors for a soft green tone
				"shadow-lg",
			)}
		>
			<div>
				<Typography
					as="h3"
					variant="h5"
					className="mb-3 text-center text-3xl font-medium text-gray-800 md:text-left"
				>
					{title}
				</Typography>
				<Typography as="p" variant="body2" className="mb-4 text-base text-gray-700">
					{description}
				</Typography>
			</div>
			<ul className="list-none space-y-2 pl-0 font-medium text-gray-700">
				{points.map((point, index) => (
					<li key={index} className="flex items-start space-x-2">
						<span className="text-gray-500">✔</span>
						<span>{point}</span>
					</li>
				))}
			</ul>
			<Typography as="p" variant="h4" className="text-center text-3xl font-semibold text-gray-800">
				{price} zł / {duration}
			</Typography>
			<div className="flex justify-center">
				<CTAList ctas={ctas} className="rounded-full px-6 py-2 text-gray-800" />
			</div>
		</div>
	);
}
