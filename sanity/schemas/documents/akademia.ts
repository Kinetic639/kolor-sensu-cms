import { defineField, defineType } from "sanity";

export default defineType({
	name: "akademia",
	title: "Akademia",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Tytuł strony",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Opis strony",
			type: "text",
		}),
		defineField({
			name: "mainImage",
			title: "Zdjęcie główne",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "productSections",
			title: "Sekcje produktowe",
			type: "array",
			of: [{ type: "productSection" }],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "mainImage",
		},
	},
});
