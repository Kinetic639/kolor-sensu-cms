import { defineField, defineType } from "sanity";
import { MdTextFields } from "react-icons/md"; // Example icon, you can change it as needed

export default defineType({
	name: "banner",
	title: "Banner",
	icon: MdTextFields,
	type: "object",
	groups: [{ name: "content", title: "Content", default: true }],
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "The main heading of the banner",
			group: "content",
		}),
		defineField({
			name: "text",
			type: "text",
			title: "Text",
			description: "The text that appears below the title",
			validation: (Rule) => Rule.required().min(10).max(450),
			group: "content",
		}),
		defineField({
			name: "alignment",
			type: "string",
			title: "Text Alignment",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Center", value: "center" },
					{ title: "Right", value: "right" },
				],
				layout: "radio", // Display as radio buttons
			},
			initialValue: "center", // Default value
			group: "content",
		}),
		defineField({
			name: "ctas",
			title: "Call-to-actions",
			type: "array",
			of: [{ type: "cta" }],
			group: "content",
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "text",
		},
		prepare({ title, subtitle }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title: title || "",
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				subtitle: subtitle || "",
			};
		},
	},
});
