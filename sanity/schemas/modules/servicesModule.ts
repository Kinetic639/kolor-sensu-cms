import { defineField, defineType } from "sanity";
import { MdBuild } from "react-icons/md";

export default defineType({
	name: "servicesModule",
	title: "Services Module",
	icon: MdBuild,
	type: "object",
	fields: [
		defineField({
			name: "title",
			title: "Module Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Module Description",
			type: "text",
			description: "A brief description for the services module",
			validation: (Rule) => Rule.max(500),
		}),
		defineField({
			name: "services",
			title: "Select Services",
			type: "array",
			of: [{ type: "reference", to: [{ type: "service" }] }],
			description: "Select the services to display in this module.",
			validation: (Rule) => Rule.min(1), // Require at least one service
		}),
	],
	preview: {
		select: {
			title: "title",
			servicesCount: "services.length",
		},
		prepare({ title, servicesCount }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title: title || "No title",
				subtitle: `${servicesCount || 0} services selected`,
			};
		},
	},
});
