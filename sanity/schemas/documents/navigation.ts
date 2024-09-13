import { defineField, defineType } from "sanity";
import { VscSymbolClass } from "react-icons/vsc";
import { count } from "@sanity/src/utils";

// Define types for the `prepare` function parameters
interface NavigationPreview {
	title: string;
	items: Array<{ _type: "link" | "link.list" }>;
}

export default defineType({
	name: "navigation",
	title: "Navigation",
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
			of: [
				{ type: "link" }, // Single link type
				{ type: "link.list" }, // List of links type
			],
		}),
	],
	preview: {
		select: {
			title: "title",
			items: "items",
		},
		prepare({ title, items }: NavigationPreview) {
			return {
				title,
				subtitle: `${count(items)} item(s)`,
			};
		},
	},
});
