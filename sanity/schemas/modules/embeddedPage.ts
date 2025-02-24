import { defineField, defineType } from "sanity";
import { AiOutlineCode } from "react-icons/ai";

export default defineType({
	name: "embeddedPage",
	title: "Embedded Page",
	type: "object",
	icon: AiOutlineCode,
	fields: [
		defineField({
			name: "embedType",
			title: "Embed Type",
			type: "string",
			options: {
				list: [
					{ title: "External URL (iframe)", value: "iframe" },
					{ title: "Custom HTML", value: "html" },
				],
				layout: "radio",
			},
			initialValue: "iframe",
		}),
		defineField({
			name: "externalUrl",
			title: "External Page URL",
			type: "url",
			hidden: ({ parent }) => parent?.embedType !== "iframe",
			validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).error("Must be a valid URL"),
		}),
		defineField({
			name: "rawHtml",
			title: "Custom HTML Code",
			type: "text",
			hidden: ({ parent }) => parent?.embedType !== "html",
		}),
		defineField({
			name: "height",
			title: "Iframe Height",
			type: "string",
			description: "Set height in pixels (e.g., 600px) for iframe embedding",
			hidden: ({ parent }) => parent?.embedType !== "iframe",
		}),
	],
	preview: {
		select: {
			embedType: "embedType",
			externalUrl: "externalUrl",
		},
		prepare({ embedType, externalUrl }) {
			return {
				title: `Embedded Page - ${embedType === "iframe" ? "External URL" : "Custom HTML"}`,
				subtitle: embedType === "iframe" ? externalUrl : "Custom HTML Content",
				media: AiOutlineCode,
			};
		},
	},
});
