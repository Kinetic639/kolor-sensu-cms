import { defineField, defineType } from "sanity";
import { MdHelpOutline } from "react-icons/md"; // Icon for FAQ List

interface FAQListPreview {
	title: string;
	questions: Array<unknown>;
}

export default defineType({
	name: "faqList",
	title: "Questions List",
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
			of: [{ type: "faqItem" }], // Reusing the faqItem schema
		}),
	],
	preview: {
		select: {
			title: "title",
			questions: "items",
		},
		prepare({ title, questions }: FAQListPreview) {
			return {
				title: title || "FAQ List",
				subtitle: `${questions?.length || 0} question(s)`,
			};
		},
	},
});
