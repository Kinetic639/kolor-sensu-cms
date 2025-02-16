"use client";

import { PortableText } from "@portabletext/react";
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaTiktok,
	FaXTwitter,
	FaYoutube,
} from "react-icons/fa6";
import { type IconType } from "react-icons";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import CTAList from "@/app/ui/CTA/CTAList";

export default function SpecialistCard({ specialist }: { specialist: Sanity.Specialist }) {
	// Mapping social media types to corresponding icons
	const socialIcons: Record<string, IconType> = {
		facebook: FaFacebookF,
		instagram: FaInstagram,
		linkedin: FaLinkedinIn,
		tiktok: FaTiktok,
		twitter: FaXTwitter,
		youtube: FaYoutube,
	};

	return (
		<div className="flex flex-col items-stretch gap-6 rounded-lg border bg-popover p-3 shadow-md md:flex-row md:p-6">
			{/* Left Section: Profile Image + Social Media */}
			<div className="flex flex-col items-center">
				{/* Specialist Image */}
				{specialist.image && (
					<div className="w-auto flex-shrink-0 overflow-hidden rounded-md md:h-80">
						<Img
							image={specialist.image}
							imageWidth={400}
							className={cn("mx-auto h-full w-auto object-cover")}
							alt={specialist.image.alt || "Zdjęcie specjalisty"}
						/>
					</div>
				)}

				{/* Social Media Icons Below the Image */}
				{specialist.showSocials && specialist.socials && specialist.socials.length > 0 && (
					<div className="group mt-4 flex gap-4">
						{specialist.socials.map((social, index) => {
							const Icon = socialIcons[social.type.toLowerCase()];
							return (
								<a
									key={index}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-foreground transition-all duration-200 hover:text-foreground hover:!opacity-100 group-hover:opacity-50"
								>
									{Icon ? <Icon className="h-6 w-6" /> : social.type}
								</a>
							);
						})}
					</div>
				)}

				{/* Call-to-action buttons (only on larger screens) */}
				<div className="hidden justify-center md:flex">
					{specialist.ctas && <CTAList ctas={specialist.ctas} className="mx-auto mt-8 w-fit" />}
				</div>
			</div>

			{/* Right Section: Specialist Information */}
			<div className="flex-1 space-y-8">
				<div className="rounded-md bg-[#c4d6c2] p-4 shadow-md">
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
			</div>

			{/* Call-to-action buttons (on mobile screens) */}
			<div className="flex justify-center md:hidden">
				{specialist.ctas && <CTAList ctas={specialist.ctas} className="mx-auto mt-8 w-fit" />}
			</div>
		</div>
	);
}
