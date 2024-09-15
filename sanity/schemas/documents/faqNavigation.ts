import { defineField, defineType } from "sanity";
import { VscSymbolClass } from "react-icons/vsc";

export default defineType({
	name: "faqNavigation",
	title: "FAQ Navigation",
	icon: VscSymbolClass,
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "items",
			type: "array",
			title: "FAQ Items and Lists",
			of: [{ type: "faqItem" }, { type: "faqList" }],
		}),
	],
	preview: {
		select: {
			title: "title",
			items: "items",
		},
		prepare({ title, items }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				subtitle: `${items?.length || 0} item(s)`,
			};
		},
	},
});
