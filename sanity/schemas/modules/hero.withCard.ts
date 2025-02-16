import { defineField, defineType } from "sanity";
import { TfiLayoutMediaLeft } from "react-icons/tfi";

export default defineType({
	name: "hero.withCard",
	title: "Hero (with Card)",
	icon: TfiLayoutMediaLeft,
	type: "object",
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "image", title: "Image" },
		{ name: "background", title: "Background" },
		{ name: "card", title: "Card" },
	],
	fields: [
		defineField({
			name: "pretitle",
			title: "Pre-title",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "content",
			title: "Content",
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
			title: "Main Image",
			type: "image",
			options: { hotspot: true },
			group: "image",
			fields: [defineField({ name: "alt", type: "string", title: "Alt Text" })],
		}),
		defineField({
			name: "card",
			title: "Floating Card",
			type: "object",
			group: "card",
			fields: [
				defineField({
					name: "title",
					title: "Card Title",
					type: "string",
				}),
				defineField({
					name: "items",
					title: "Card Items",
					type: "array",
					of: [
						{
							type: "object",
							fields: [
								defineField({
									name: "icon",
									title: "Icon",
									type: "image",
									options: { hotspot: true },
								}),
								defineField({
									name: "text",
									title: "Text",
									type: "string",
								}),
							],
						},
					],
				}),
			],
		}),
	],
	preview: {
		select: {
			title: "pretitle",
			media: "image.asset",
		},
		prepare: ({ title, media }) => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			title: title || "Hero With Card",
			subtitle: "Hero section with a floating card",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			media,
		}),
	},
});
