import { defineType, defineField } from "sanity";
import { VscPackage } from "react-icons/vsc"; // Optional: Choose any icon

export default defineType({
	name: "product",
	title: "Product",
	icon: VscPackage, // Optional: Set a relevant icon for the product document
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "The name of the product.",
			validation: (Rule) => Rule.required().min(2).max(80), // Validation for required title with length limits
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "A short description of the product.",
			validation: (Rule) => Rule.required().min(10).max(200), // Validation for description with character limits
		}),
		defineField({
			name: "image",
			title: "Product Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
					description: "Alternative text for the image (for accessibility).",
				},
			],
		}),
		defineField({
			name: "link",
			title: "Product Link",
			type: "url",
			description: "Link to the product page or external purchase link.",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
			media: "image",
		},
		prepare(selection) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { title, subtitle, media } = selection;
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				subtitle,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				media,
			};
		},
	},
});
