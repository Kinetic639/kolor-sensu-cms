import { defineField, defineType } from "sanity";
import { TfiLayoutMediaLeft } from "react-icons/tfi";

export default defineType({
	name: "splitContent",
	title: "Split Content",
	icon: TfiLayoutMediaLeft,
	type: "object",
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "image", title: "Image" },
		{ name: "background", title: "Background" },
	],
	fields: [
		// Content Fields
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "subheading",
			title: "Subheading",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "items",
			title: "Items",
			type: "array",
			of: [
				defineField({
					name: "item",
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
				}),
			],
			group: "content",
		}),
		// Image on the Left
		defineField({
			name: "image",
			title: "Left Image",
			type: "image",
			options: { hotspot: true },
			fields: [
				defineField({
					name: "alt",
					type: "string",
					title: "Alt Text",
				}),
			],
			group: "image",
		}),
		// Background Options
		defineField({
			name: "backgroundType",
			title: "Background Type",
			type: "string",
			options: {
				list: [
					{ title: "Solid", value: "solid" },
					{ title: "Wavy", value: "wavy" },
				],
				layout: "radio",
			},
			initialValue: "wavy",
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
			name: "backgroundOverlap",
			title: "Background Overlap",
			type: "boolean",
			description: "Enable to overlap with the previous section.",
			group: "background",
		}),
	],
	preview: {
		select: {
			title: "heading",
			subtitle: "subheading",
			media: "image.asset",
		},
		prepare: ({ title, subtitle, media }) => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			title: title || "Split Content",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			subtitle: subtitle || "No subheading provided",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			media,
		}),
	},
});
