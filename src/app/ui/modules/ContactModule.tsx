import React from "react";
import { ContactForm } from "@/components/forms/ContactForm";
import Img from "@/app/ui/Img";

export default function ContactModule({
	phone,
	email,
	image,
}: {
	title?: string;
	phone?: string;
	email?: string;
	richDescription?: Sanity.BlockContent;
	image?: {
		asset: { url: string };
		alt: string;
	};
}) {
	return (
		<section className="mx-auto flex h-fit w-full max-w-screen-xl flex-wrap gap-12 px-4 py-10 md:px-8">
			<div className="flex flex-1 flex-col items-center justify-between gap-12 p-4 text-center">
				{/* Contact Info */}
				{(phone || email) && (
					<div className="space-y-2 text-2xl text-[#1C68A7]">
						{phone && (
							<div className="flex flex-col md:flex-row">
								<span className="mr-1 text-lg md:text-2xl">Telefon: </span>
								<a href={`tel:${phone}`} className="font-semibold">
									{phone}
								</a>
							</div>
						)}
						{email && (
							<div className="flex flex-col md:flex-row">
								<span className="mr-1 text-lg md:text-2xl">Email:</span>
								<a href={`mailto:${email}`} className="font-semibold">
									{email}
								</a>
							</div>
						)}
					</div>
				)}

				{/* Image */}
				{image?.asset?.url && (
					<div className="w-full">
						<Img
							image={image}
							imageWidth={800}
							alt={image.alt || "Contact Image"}
							className="w-full object-cover"
						/>
					</div>
				)}
			</div>

			{/* Contact Form */}
			<div className="flex-1">
				<ContactForm />
			</div>
		</section>
	);
}
