"use client";

import { PortableText } from "@portabletext/react";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import CTAList from "@/app/ui/CTA/CTAList";

export default function SpecialistCard({ specialist }: { specialist: Sanity.Specialist }) {
	return (
		<div className="flex flex-col items-stretch gap-6 rounded-lg border bg-popover p-3 shadow-md md:flex-row md:p-6">
			<div>
				{specialist.image && (
					<div className="w-auto flex-shrink-0 overflow-hidden rounded-md md:h-80">
						<Img
							image={specialist.image}
							imageWidth={400}
							className={cn("mx-auto h-full w-auto object-cover")}
							alt={specialist.image.alt || "zdjęcie specjalisty"}
						/>
					</div>
				)}
				<div className="hidden justify-center md:flex">
					{specialist.ctas && <CTAList ctas={specialist.ctas} className="mx-auto mt-8 w-fit" />}
				</div>
			</div>

			<div className="flex-1 space-y-8">
				<div className="rounded-md bg-[#c4d6c2] p-4">
					<Typography as="h2" variant="h3" className="mb-1 max-md:text-base max-md:font-bold">
						<span className="text-base">{specialist.title} </span>
						{specialist.firstName} {specialist.lastName}
					</Typography>
					<Typography as="p" variant="caption" className="max-w-xl font-medium">
						{specialist.shortDescription}
					</Typography>
				</div>
				<div className="text-sm">
					<PortableText
						value={specialist.fullDescription}
						components={customPortableTextComponents}
					/>
				</div>
				{/*<div className="relative">*/}
				{/*	/!* Bookero booking system *!/*/}
				{/*	<div>bookero:</div>*/}
				{/*	<div id="bookero" className="bookero-container"></div>*/}
				{/*</div>*/}
			</div>
			<div className="flex justify-center md:hidden">
				{specialist.ctas && <CTAList ctas={specialist.ctas} className="mx-auto mt-8 w-fit" />}
			</div>
		</div>
	);
}
