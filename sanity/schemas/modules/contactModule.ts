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
			name: "richDescription",
			title: "Form Description",
			type: "array",
			description: "Description for the contact form with rich text formatting",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Heading 1", value: "h1" },
						{ title: "Heading 2", value: "h2" },
						{ title: "Heading 3", value: "h3" },
						{ title: "Heading 4", value: "h4" },
						{ title: "Heading 5", value: "h5" },
						{ title: "Heading 6", value: "h6" },
						{ title: "caption", value: "caption" },
						{ title: "body2", value: "body2" },
						{ title: "Quote", value: "blockquote" },
					],
				},
			],
		}),
		defineField({
			name: "phone",
			title: "Phone Number",
			type: "string",
			description: "Contact phone number",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "email",
			title: "Email Address",
			type: "email",
			description: "Contact email address",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			title: "Contact Page Image",
			type: "image",
			description: "Image to display on the contact page",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
					description: "Alternative text for screen readers.",
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "phone",
			media: "image",
		},
		prepare({ title, subtitle, media }) {
			return {
				title: title || "Contact Form",
				subtitle: subtitle || "No phone number provided",
				media,
			};
		},
	},
});
