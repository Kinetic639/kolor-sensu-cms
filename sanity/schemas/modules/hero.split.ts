import { defineField, defineType } from "sanity";
import { TfiLayoutMediaLeft } from "react-icons/tfi";
import { getBlockText } from "@sanity/src/utils";

export default defineType({
	name: "hero.split",
	title: "Hero (split)",
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
			name: "pretitle",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "content",
			type: "array",
			of: [{ type: "block" }],
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
			title: "pretitle",
			content: "content",
			media: "image.asset",
		},
		prepare: ({ title, media }) => ({
			title: title?.[0]?.children?.[0]?.text || "Split Content",
			subtitle: "Hero (split)",
			media,
		}),
	},
});
