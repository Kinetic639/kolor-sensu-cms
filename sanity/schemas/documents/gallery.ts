import { defineType, defineField } from "sanity";

export default defineType({
	name: "gallery",
	title: "Gallery",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "images",
			title: "Images",
			type: "array",
			of: [
				{
					type: "image",
					options: {
						hotspot: true,
					},
					fields: [
						{
							name: "alt",
							type: "string",
							title: "Alt text",
							description: "Describe the image for screen readers",
						},
						{
							name: "title",
							type: "string",
							title: "Title",
							description: "Title of the image",
							validation: (Rule) => Rule.required(),
						},
						{
							name: "description",
							type: "text",
							title: "Description",
							description: "Description of the image",
							validation: (Rule) => Rule.required(),
						},
					],
				},
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "images.0",
		},
		prepare({ title, media }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				media,
			};
		},
	},
});
