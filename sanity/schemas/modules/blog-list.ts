import { defineField, defineType } from "sanity";
import { VscEdit } from "react-icons/vsc";
import { getBlockText } from "@sanity/src/utils";

export default defineType({
	name: "blog-list",
	title: "Blog list",
	icon: VscEdit,
	type: "object",
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "filtering", title: "Filtering" },
		{ name: "options", title: "Options" },
	],
	fields: [
		defineField({
			name: "intro",
			type: "array",
			of: [{ type: "block" }],
			group: "content",
		}),
		defineField({
			name: "layout",
			type: "string",
			options: {
				list: ["grid", "carousel"],
				layout: "radio",
			},
			initialValue: "carousel",
			group: "options",
		}),
		defineField({
			name: "limit",
			type: "number",
			description: "Number of posts to show. Leave empty to show all posts.",
			validation: (Rule) => Rule.min(1).integer(),
			group: "filtering",
		}),
		defineField({
			name: "displayFilters",
			title: "Display category filter buttons",
			type: "boolean",
			initialValue: false,
			group: "filtering",
		}),
		defineField({
			name: "predefinedFilters",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "blog.category" }],
				},
			],
			description: "Filter posts by category",
			group: "filtering",
		}),
		defineField({
			name: "textItems",
			title: "Texts with Icons",
			type: "array",
			of: [
				{
					type: "object",
					title: "Text with Icon",
					fields: [
						defineField({
							name: "text",
							type: "string",
							title: "Text",
							description: "Text to display",
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "icon",
							type: "image",
							title: "Icon",
							description: "Icon to display next to the text",
							options: {
								hotspot: true,
							},
						}),
					],
					preview: {
						select: {
							title: "text",
							media: "icon",
						},
					},
				},
			],
			group: "content",
		}),
	],
	preview: {
		select: {
			intro: "intro",
		},
		prepare: ({ intro }) => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			title: getBlockText(intro),
			subtitle: "Blog list",
		}),
	},
});
