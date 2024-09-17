import { defineType, defineField } from "sanity";
import { MdPeople } from "react-icons/md";

export default defineType({
	name: "specialistsModule",
	title: "Specialists Module",
	icon: MdPeople,
	type: "object",
	fields: [
		defineField({
			name: "title",
			title: "Module Title",
			type: "string",
			description: "Title of the module to be displayed on the page",
		}),
		defineField({
			name: "specialists",
			title: "Specialists",
			type: "array",
			of: [{ type: "reference", to: [{ type: "specialist" }] }],
			description: "Select the specialists to display in this module",
		}),
	],
	preview: {
		select: {
			title: "title",
			specialistCount: "specialists.length",
		},
		prepare(selection) {
			const { title, specialistCount } = selection;
			return {
				title: title || "Specialists Module",
				subtitle: `${specialistCount || 0} specialists selected`,
			};
		},
	},
});
