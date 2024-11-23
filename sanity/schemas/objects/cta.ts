import { defineField, defineType } from "sanity";
import { VscInspect } from "react-icons/vsc";

export default defineType({
	name: "cta",
	title: "Call-to-action",
	icon: VscInspect,
	type: "object",
	fields: [
		defineField({
			name: "link",
			type: "link",
		}),
		defineField({
			name: "type",
			title: "Button Type",
			type: "string",
			options: {
				list: [
					{ title: "Action", value: "action" },
					{ title: "Outline", value: "outline" },
					{ title: "Ghost", value: "ghost" },
					{ title: "Link", value: "link" },
					{ title: "Button", value: "button" },
				],
				layout: "radio",
			},
		}),
		defineField({
			name: "style",
			title: "Button Style",
			type: "string",
			options: {
				list: [
					{ title: "Solid", value: "solid" },
					{ title: "Gradient", value: "gradient" },
				],
				layout: "radio",
			},
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			hidden: ({ parent }) => parent?.type !== "button", // Only show when 'type' is 'button'
		}),
		defineField({
			name: "color",
			title: "Button Color",
			type: "string",
			options: {
				list: [
					{ title: "Primary", value: "primary" },
					{ title: "Secondary", value: "secondary" },
					{ title: "Accent", value: "accent" },
					{ title: "Neutral", value: "neutral" },
				],
			},
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			hidden: ({ parent }) => !(parent?.type === "button" && parent?.style === "solid"), // Only show when 'type' is 'button' and 'style' is 'solid'
		}),
	],
	preview: {
		select: {
			label: "link.label",
			pageTitle: "link.internal.title",
			internal: "link.internal.metadata.slug.current",
			external: "link.external",
		},
		prepare: ({ label, pageTitle, internal, external }) => ({
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			title: label || pageTitle,
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			subtitle: external || (internal && (internal === "index" ? "/" : `/${internal}`)),
		}),
	},
});
