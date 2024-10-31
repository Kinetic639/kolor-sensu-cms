import { defineType, defineField } from "sanity";
import { VscListSelection } from "react-icons/vsc"; // Optional icon

export default defineType({
	name: "productsModule",
	title: "Products Module",
	icon: VscListSelection, // Optional: icon for the module
	type: "document", // You can also use 'object' if it's part of a page
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			description: "The title for the products section.",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			description: "Optional description of the product section.",
			validation: (Rule) => Rule.max(200), // Optional description with a character limit
		}),
		defineField({
			name: "products",
			title: "Products",
			type: "array",
			of: [{ type: "reference", to: [{ type: "product" }] }], // Reference the "product" document type
			description: "Add products to display in this module.",
			validation: (Rule) => Rule.required().min(1), // At least one product is required
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "description",
		},
		prepare(selection) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const { title, subtitle } = selection;
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				subtitle: subtitle ? subtitle : "No description",
			};
		},
	},
});
