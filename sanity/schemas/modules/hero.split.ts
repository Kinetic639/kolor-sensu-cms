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
		{ name: "background", title: "Background" }, // Define the background group here
	],
	fields: [
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
		// defineField({
		// 	name: "reputation",
		// 	type: "reference",
		// 	to: [{ type: "reputation" }],
		// 	group: "content",
		// }),
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
			initialValue: "solid", // Default value
			group: "background", // Add it to a new 'background' group
		}),
		defineField({
			name: "image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					type: "string",
				}),
				defineField({
					name: "onRight",
					type: "boolean",
					initialValue: false,
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
			title: getBlockText(content),
			subtitle: "Hero (split)",
			media,
		}),
	},
});
