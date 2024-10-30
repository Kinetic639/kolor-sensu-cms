import { defineField, defineType } from "sanity";
import { TfiLayoutCtaCenter } from "react-icons/tfi";
import { textAlign, alignItems, alignmentFieldset } from "../fragments/fields/alignment";
import { getBlockText } from "@sanity/src/utils";

export default defineType({
	name: "hero",
	title: "Hero",
	icon: TfiLayoutCtaCenter,
	type: "object",
	groups: [{ name: "content", default: true }, { name: "image" }, { name: "options" }],
	fieldsets: [alignmentFieldset],
	fields: [
		defineField({
			name: "pretitle",
			type: "string",
			group: "content",
		}),
		defineField({
			name: "content",
			type: "array",
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
			name: "bgImage",
			title: "Background image",
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
		defineField({
			name: "bgImageMobile",
			title: "Background image (mobile)",
			type: "image",
			options: {
				hotspot: true,
			},
			group: "image",
		}),
		defineField({
			...textAlign,
			fieldset: "alignment",
		}),
		defineField({
			...alignItems,
			fieldset: "alignment",
		}),
	],
	preview: {
		select: {
			content: "content",
			media: "bgImage",
		},
		prepare: ({ content, media }) => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			title: getBlockText(content),
			subtitle: "Hero",
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			media,
		}),
	},
});
