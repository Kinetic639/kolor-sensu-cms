import { defineType, defineField } from "sanity";
import { AiOutlineFileText } from "react-icons/ai";

export default defineType({
	name: "richtextModule",
	title: "Rich Text Module",
	type: "object",
	icon: AiOutlineFileText,
	fields: [
		defineField({
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		}),
		defineField({
			name: "tableOfContents",
			title: "Enable Table of Contents",
			type: "boolean",
			initialValue: false,
		}),
		defineField({
			name: "tocPosition",
			title: "Table of Contents Position",
			type: "string",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
				],
				layout: "radio",
			},
			hidden: ({ parent }) => !parent?.tableOfContents,
		}),
	],
	preview: {
		select: {
			content: "content",
		},
		prepare({ content }) {
			return {
				title: "Rich Text Module",
				subtitle: content ? "Contains content" : "Empty",
				media: AiOutlineFileText,
			};
		},
	},
});
