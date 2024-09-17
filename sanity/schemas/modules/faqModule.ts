import { defineField, defineType } from "sanity";
import { VscSymbolClass } from "react-icons/vsc";

export default defineType({
	name: "faqModule",
	title: "FAQ Module",
	type: "object",
	icon: VscSymbolClass,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "showTitle",
			title: "Show Title",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "showDescription",
			title: "Show Description",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "faqNavigation",
			title: "Select FAQ Navigation",
			type: "reference",
			to: [{ type: "faqNavigation" }],
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			showTitle: "showTitle",
			showDescription: "showDescription",
			description: "description",
			faqNavigationTitle: "faqNavigation.title",
		},
		prepare({ title, showTitle, showDescription, description, faqNavigationTitle }) {
			const subtitleText =
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
				showDescription && description ? `${description.slice(0, 50)}...` : "No description";
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const titleText = showTitle ? title : "Title hidden";
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title: titleText,
				subtitle: `FAQ: ${faqNavigationTitle || "No FAQ Navigation Selected"} - ${subtitleText}`,
			};
		},
	},
});
