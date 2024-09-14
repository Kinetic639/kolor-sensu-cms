import { defineField, defineType } from "sanity";
import { MdHelpOutline } from "react-icons/md";

export default defineType({
	name: "faqList",
	title: "FAQ List",
	icon: MdHelpOutline,
	type: "object",
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "List Title",
			description: "Provide a title for the list of questions",
		}),
		defineField({
			name: "items",
			type: "array",
			title: "Questions and Answers",
			of: [{ type: "faqItem" }],
		}),
	],
	preview: {
		select: {
			title: "title",
			questions: "items",
		},
		prepare({ title, questions }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title: title || "FAQ List",
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				subtitle: `${questions?.length || 0} question(s)`,
			};
		},
	},
});
