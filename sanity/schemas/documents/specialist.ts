import { defineType, defineField } from "sanity";

export default defineType({
	name: "specialist",
	title: "Specialist",
	type: "document",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			options: {
				list: ["mgr", "dr", "dr hab.", "prof."],
			},
		}),
		defineField({
			name: "firstName",
			title: "First Name",
			type: "string",
		}),
		defineField({
			name: "lastName",
			title: "Last Name",
			type: "string",
		}),
		defineField({
			name: "shortDescription",
			title: "Short Description",
			type: "text",
			description: "A brief introduction or overview of the specialist.",
			validation: (Rule) => Rule.max(200),
		}),
		defineField({
			name: "fullDescription",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Heading 1", value: "h1" },
						{ title: "Heading 2", value: "h2" },
						{ title: "Heading 3", value: "h3" },
						{ title: "Heading 4", value: "h4" },
						{ title: "Heading 5", value: "h5" },
						{ title: "Heading 6", value: "h6" },
						{ title: "caption", value: "caption" },
						{ title: "body2", value: "body2" },
						{ title: "Quote", value: "blockquote" },
					],
				},
			],
			description: "Detailed bio or description of the specialist.",
		}),
		defineField({
			name: "image",
			title: "Profile Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				{
					name: "alt",
					title: "Alt Text",
					type: "string",
					description: "Alternative text for screen readers.",
				},
			],
		}),
		defineField({
			name: "ctas",
			title: "Call-to-actions",
			type: "array",
			of: [{ type: "cta" }],
		}),
	],
	preview: {
		select: {
			title: "firstName",
			subtitle: "lastName",
			media: "image",
		},
		prepare(selection) {
			const { title, subtitle, media } = selection;
			return {
				title: `${title} ${subtitle}`,
				media,
			};
		},
	},
});
