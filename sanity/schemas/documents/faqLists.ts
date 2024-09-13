import { defineField, defineType } from "sanity";
import { VscSymbolClass } from "react-icons/vsc"; // You can choose any appropriate icon
import { count } from "@sanity/src/utils";
interface FAQNavigationPreview {
	title: string;
	items: Array<{
		_type: "faqItem" | "faqList";
	}>;
}
export default defineType({
	name: "faqNavigation",
	title: "FAQ questions",
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
			of: [
				{ type: "faqItem" }, // Single FAQ Item
				{ type: "faqList" }, // List of FAQ Items
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			items: "items",
		},
		prepare: ({ title, items }: FAQNavigationPreview) => ({
			title,
			subtitle: `${count(items)} `,
		}),
	},
});
