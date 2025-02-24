import { defineField, defineType } from "sanity";
import { TfiLayoutMediaLeft } from "react-icons/tfi";
import { getBlockText } from "@sanity/src/utils";

export default defineType({
	name: "hero.modern",
	title: "Hero (modern)",
	icon: TfiLayoutMediaLeft,
	type: "object",
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "image", title: "Image" },
		{ name: "background", title: "Background" },
	],
	fields: [
		// Existing fields
		defineField({
			name: "title",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "subtitle",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "ctas",
			title: "Call-to-actions",
			type: "array",
			of: [{ type: "cta" }],
			group: "content",
		}),
		defineField({
			name: "backgroundType",
			title: "Background Type",
			type: "string",
			options: {
				list: [
					{ title: "Solid", value: "solid" },
					{ title: "Blob", value: "blob" },
					{ title: "Transparent", value: "transparent" },
				],
				layout: "radio",
			},
			initialValue: "solid",
			group: "background",
		}),
		defineField({
			name: "backgroundImage",
			title: "Background Image",
			type: "image",
			options: { hotspot: true },
			group: "background",
		}),

		defineField({
			name: "backgroundImageMobile",
			title: "Background Image Mobile",
			type: "image",
			options: { hotspot: true },
			group: "background",
		}),
		defineField({
			name: "image",
			type: "image",
			options: { hotspot: true },
			fields: [
				defineField({ name: "alt", type: "string" }),
				defineField({ name: "onRight", type: "boolean", initialValue: false }),
				defineField({
					name: "frameStyle",
					title: "Image Frame Style",
					type: "string",
					options: {
						list: [
							{ title: "Rectangle", value: "rectangle" },
							{ title: "Circle", value: "circle" },
							{ title: "Blob", value: "blob" },
						],
						layout: "radio",
					},
					initialValue: "rectangle",
				}),
				defineField({
					name: "loading",
					type: "string",
					options: {
						layout: "radio",
						list: ["lazy", "eager"],
					},
					initialValue: "lazy",
				}),
			],
			group: "image",
		}),
	],
	preview: {
		select: {
			content: "content",
			media: "image.asset",
		},
		prepare: ({ content, media }) => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			title: getBlockText(content),
			subtitle: "Hero (split)",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			media,
		}),
	},
});
