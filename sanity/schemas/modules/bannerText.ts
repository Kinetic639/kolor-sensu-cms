import { defineField, defineType } from "sanity";
import { MdTextFields } from "react-icons/md"; // Example icon, you can change it as needed

export default defineType({
	name: "bannerText",
	title: "Banner Text",
	icon: MdTextFields,
	type: "object",
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "background", title: "Background" },
	],
	fields: [
		defineField({
			name: "texts",
			type: "array",
			title: "Texts",
			description: "Enter multiple texts that will display in the banner",
			of: [
				{
					type: "string",
				},
			],
			validation: (Rule) => Rule.required().min(1), // At least one text is required
			group: "content",
		}),
		defineField({
			name: "displayType",
			type: "string",
			title: "Display Type",
			description: "Select how texts should be displayed",
			options: {
				list: [
					{ title: "Switch", value: "switch" },
					{ title: "Slide", value: "slide" },
				],
				layout: "radio",
			},
			initialValue: "switch", // Default to "switch"
			validation: (Rule) => Rule.required(),
			group: "content",
		}),
		defineField({
			name: "backgroundType",
			title: "Background Type",
			type: "string",
			options: {
				list: [
					{ title: "Solid", value: "solid" },
					{ title: "Transparent", value: "transparent" },
				],
				layout: "radio",
			},
			initialValue: "solid",
			group: "background",
		}),
	],
	preview: {
		select: {
			texts: "texts",
			displayType: "displayType",
		},
		prepare({ texts, displayType }) {
			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
				title: texts?.[0] || "No text provided",
				subtitle: displayType
					? // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
						`${displayType.charAt(0).toUpperCase() + displayType.slice(1)} mode`
					: "No display type selected",
			};
		},
	},
});
