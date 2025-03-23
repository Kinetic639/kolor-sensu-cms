import { defineField, defineType, defineArrayMember } from "sanity";
import { BiCard, BiFontColor } from "react-icons/bi";

export default defineType({
	name: "productSectionModule",
	title: "Product Section",
	type: "object",
	fields: [
		defineField({
			name: "sectionTitle",
			title: "Section Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{ title: "Normal", value: "normal" },
						{ title: "Heading 2", value: "h2" },
						{ title: "Heading 3", value: "h3" },
						{ title: "Heading 4", value: "h4" },
						{ title: "Heading 5", value: "h5" },
						{ title: "Heading 6", value: "h6" },
						{ title: "Caption", value: "caption" },
						{ title: "Body 2", value: "body2" },
						{ title: "Quote", value: "blockquote" },
					],
					marks: {
						decorators: [
							{ title: "Strong", value: "strong" },
							{ title: "Emphasis", value: "em" },
							{ title: "Underline", value: "underline" },
							{ title: "Strike", value: "strike-through" },
							{ title: "Indent", value: "indent" },
						],
						annotations: [
							defineArrayMember({
								name: "link",
								title: "Link",
								type: "object",
								fields: [{ name: "href", type: "url", title: "URL" }],
							}),
							defineArrayMember({
								name: "card",
								title: "Card",
								type: "object",
								icon: BiCard,
								fields: [
									defineField({
										name: "color",
										title: "Card Background Color",
										type: "simplerColor",
									}),
								],
							}),
							defineArrayMember({
								name: "textColor",
								title: "Text Color",
								type: "object",
								icon: BiFontColor,
								fields: [
									defineField({
										name: "color",
										title: "Text Color",
										type: "simplerColor",
									}),
								],
							}),
						],
					},
				},
			],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: "reversed",
			title: "Reverse Layout",
			type: "boolean",
			description: "When enabled, image will be on the right and text will be right-aligned",
			initialValue: false,
		}),
		defineField({
			name: "link",
			title: "Link",
			type: "link",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "productType",
			title: "Product Type",
			type: "string",
			options: {
				list: [
					{ title: "Courses", value: "courses" },
					{ title: "Free Materials", value: "freeMaterials" },
				],
			},
			validation: (Rule) => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: "sectionTitle",
			subtitle: "productType",
		},
	},
});
