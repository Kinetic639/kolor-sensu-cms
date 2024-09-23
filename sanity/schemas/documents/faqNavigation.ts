import { defineField, defineType } from "sanity";
import { VscSymbolClass } from "react-icons/vsc";

export default defineType({
	name: "faqNavigation",
	title: "FAQ Lists",
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
			title: "FAQ Items",
			of: [{ type: "faqItem" }],
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
