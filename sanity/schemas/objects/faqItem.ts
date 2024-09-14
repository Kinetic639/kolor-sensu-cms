import { defineField, defineType } from "sanity";
import { MdQuestionAnswer } from "react-icons/md";

export default defineType({
	name: "faqItem",
	title: "FAQ Item",
	icon: MdQuestionAnswer,
	type: "object",
	fields: [
		defineField({
			name: "question",
			type: "string",
			title: "Question",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "answer",
			type: "text",
			title: "Answer",
			validation: (Rule) => Rule.required().min(10).max(500),
		}),
	],
	preview: {
		select: {
			title: "question",
			subtitle: "answer",
		},
		prepare(selection: { title?: string; subtitle?: string }) {
			return {
				title: selection.title || "No question provided",
				subtitle:
					selection.subtitle && selection.subtitle.length > 50
						? `${selection.subtitle.slice(0, 50)}...`
						: selection.subtitle || "No answer provided",
			};
		},
	},
});
