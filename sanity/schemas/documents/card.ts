import { defineField, defineType } from "sanity";
import { MdViewAgenda } from "react-icons/md";

export default defineType({
	name: "card",
	title: "Card",
	icon: MdViewAgenda,
	type: "document", // Change from "object" to "document" to make it a standalone document
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Card Title",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Card Image",
			options: {
				hotspot: true,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "frontText",
			type: "text",
			title: "Front Text",
			description: "Text that will appear on the front of the card.",
			validation: (Rule) => Rule.required().max(200),
		}),
		defineField({
			name: "hoverText",
			type: "text",
			title: "Hover Text (Optional)",
			description: "Text that will appear when the card is hovered.",
		}),
		defineField({
			name: "faqList",
			type: "reference",
			to: [{ type: "faqNavigation" }],
			title: "Related FAQ (Optional)",
			description: "Optionally connect an FAQ list to this card.",
		}),
	],
	preview: {
		select: {
			title: "title",
			media: "image",
			frontText: "frontText",
			hoverText: "hoverText",
		},
		prepare({ title, media, frontText, hoverText }) {
			return {
				title,
				subtitle: hoverText ? `${frontText.substring(0, 50)}... (hover)` : frontText,
				media,
			};
		},
	},
});
