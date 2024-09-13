import { defineField, defineType } from "sanity";
import { MdQuestionAnswer } from "react-icons/md"; // Icon for FAQ

// Define the type for the `prepare` function parameters
interface FAQItemPreview {
	title: string;
	subtitle: string;
}

export default defineType({
	name: "faqItem",
	title: "Single Question",
	icon: MdQuestionAnswer,
	type: "object",
	fields: [
		defineField({
			name: "question",
			type: "string",
			title: "Question",
			description: "Enter the question",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "answer",
			type: "text",
			title: "Answer",
			description: "Provide the answer for the question",
			validation: (Rule) => Rule.required().min(10).max(500),
		}),
	],
	preview: {
		select: {
			title: "question",
			subtitle: "answer",
		},
		prepare({ title, subtitle }: FAQItemPreview) {
			return {
				title,
				subtitle: subtitle.length > 50 ? `${subtitle.slice(0, 50)}...` : subtitle,
			};
		},
	},
});
