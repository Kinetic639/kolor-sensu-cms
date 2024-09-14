import { defineField, defineType } from "sanity";
import { MdViewCompact } from "react-icons/md";

// Define types for the `prepare` function
interface CardsSectionPreview {
	title: string;
	subtitle?: string;
}

export default defineType({
	name: "cardsSection",
	title: "Cards Section",
	icon: MdViewCompact,
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Section Title",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Section Subtitle",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "fullscreen",
			type: "boolean",
			title: "Full Width",
			description: "Display section in full width.",
			initialValue: false,
		}),
		defineField({
			name: "cards",
			type: "array",
			title: "Cards",
			description: "Add the cards that will be displayed in this section.",
			of: [{ type: "reference", to: [{ type: "card" }] }], // Now it's a reference to reusable card documents
			validation: (Rule) => Rule.min(3).max(3), // Ensure there are always 3 cards
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "subtitle",
		},
		prepare({ title, subtitle }: CardsSectionPreview) {
			return {
				title,
				subtitle: subtitle || "No subtitle",
			};
		},
	},
});
