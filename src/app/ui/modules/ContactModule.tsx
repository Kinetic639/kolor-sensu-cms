import React from "react";
import { ContactForm } from "@/components/forms/ContactForm";

export default function ContactModule() {
	return (
		<section className="py-12">
			<div className="mx-auto flex w-full max-w-screen-xl px-1 md:px-4">
				{/*{title && (*/}
				{/*	<Typography as="h2" variant="h3" className="mb-4">*/}
				{/*		{title}*/}
				{/*	</Typography>*/}
				{/*)}*/}
				{/*{description && (*/}
				{/*	<Typography as="p" variant="body1" className="mb-8">*/}
				{/*		{description}*/}
				{/*	</Typography>*/}
				{/*)}*/}
				<div className="flex-1">side content</div>
				<ContactForm />
			</div>
		</section>
	);
}
