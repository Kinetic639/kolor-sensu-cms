import { defineField, defineType } from "sanity";

export default defineType({
	name: "service",
	title: "Service",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required().max(100),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "A brief description of the service (optional)",
			rows: 4,
			validation: (Rule) => Rule.max(500),
		}),
		defineField({
			name: "points",
			title: "What this service provides",
			type: "array",
			of: [{ type: "string" }],
			description: "List of points outlining the benefits or features of the service",
			validation: (Rule) => Rule.min(1).max(10),
		}),
		defineField({
			name: "price",
			title: "Price",
			type: "number",
			description: "Price of the service in your chosen currency",
			validation: (Rule) => Rule.required().positive(),
		}),
		defineField({
			name: "ctas",
			title: "Call-to-actions",
			type: "array",
			of: [{ type: "cta" }],
		}),
		defineField({
			name: "duration",
			title: "Consultation Duration",
			type: "string",
			description: "Duration of one consultation (e.g. 50 minutes)",
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "duration",
			price: "price",
		},
		prepare({ title, subtitle, price }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title,
				subtitle: `Duration: ${subtitle} | Price: $${price}`,
			};
		},
	},
});
