import { defineField, defineType } from "sanity";
import { TfiAnnouncement } from "react-icons/tfi";

export default defineType({
	name: "actionBanner",
	title: "Action Banner",
	icon: TfiAnnouncement,
	type: "object",
	groups: [
		{ name: "content", title: "Content", default: true },
		{ name: "style", title: "Style" },
	],
	fields: [
		defineField({
			name: "heading",
			title: "Heading",
			type: "string",
			group: "content",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "cta",
			title: "Call-to-action",
			type: "cta",
			group: "content",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "colorVariant",
			title: "Color Variant",
			type: "string",
			options: {
				list: [
					{ title: "Dark Blue", value: "darkBlue" },
					{ title: "Light", value: "light" },
					{ title: "Green", value: "green" },
				],
				layout: "radio",
			},
			initialValue: "darkBlue",
			group: "style",
		}),
	],
	preview: {
		select: {
			title: "heading",
			cta: "cta.label",
		},
		prepare: ({ title, cta }: { title?: string; cta?: string }) => ({
			title: title || "Action Banner",
			subtitle: cta ? `CTA: ${cta}` : "No CTA set",
		}),
	},
});
