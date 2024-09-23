import { defineField, defineType } from "sanity";
import { TfiEmail } from "react-icons/tfi";

export default defineType({
	name: "contactModule",
	title: "Contact Module",
	icon: TfiEmail,
	type: "object",
	fields: [
		defineField({
			name: "title",
			title: "Form Title",
			type: "string",
			description: "Title for the contact form",
			validation: (Rule) => Rule.required().max(100),
		}),
		defineField({
			name: "description",
			title: "Form Description",
			type: "text",
			description: "Description for the contact form",
		}),
	],
	preview: {
		select: {
			title: "title",
		},
		prepare({ title }) {
			return {
				title: title || "Contact Form",
				subtitle: "Contact Module",
			};
		},
	},
});
