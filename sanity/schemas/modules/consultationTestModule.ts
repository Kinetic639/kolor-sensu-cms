import { defineField, defineType } from "sanity";

export default defineType({
	name: "consultationTestModule",
	title: "Consultation Test Module",
	type: "object",
	fields: [
		defineField({
			name: "info",
			type: "string",
			title: "Information",
			initialValue: "This is a static module",
			hidden: true, // This hides the field in the studio
		}),
	],
	preview: {
		prepare() {
			return {
				title: "Consultation Test Module",
				subtitle: "Static module without user interaction",
			};
		},
	},
});
