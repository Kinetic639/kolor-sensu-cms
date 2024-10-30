import { defineField, defineType } from "sanity";
import { VscSymbolClass } from "react-icons/vsc";

export default defineType({
	name: "faqModule",
	title: "FAQ Module",
	type: "object",
	icon: VscSymbolClass,
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "showTitle",
			title: "Show Title",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "showDescription",
			title: "Show Description",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "faqNavigation",
			title: "Select FAQ Navigation",
			type: "reference",
			to: [{ type: "faqNavigation" }],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			title: "Image",
			type: "image",
			options: {
				hotspot: true,
			},
			fields: [
				defineField({
					name: "alt",
					title: "Alt Text",
					type: "string",
					description: "Alternative text for screen readers.",
				}),
			],
		}),
		defineField({
			name: "showImage",
			title: "Show Image",
			type: "boolean",
			initialValue: true,
		}),
	],
	preview: {
		select: {
			title: "title",
			showTitle: "showTitle",
			showDescription: "showDescription",
			description: "description",
			faqNavigationTitle: "faqNavigation.title",
			image: "image",
			showImage: "showImage",
		},
		prepare({
			title,
			showTitle,
			showDescription,
			description,
			faqNavigationTitle,
			image,
			showImage,
		}) {
			const subtitleText =
				// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
				showDescription && description ? `${description.slice(0, 50)}...` : "No description";
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			const titleText = showTitle ? title : "Title hidden";
			const imageText = showImage && image ? "Image displayed" : "No image";

			return {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				title: titleText,
				subtitle: `FAQ: ${faqNavigationTitle || "No FAQ Navigation Selected"} - ${subtitleText} - ${imageText}`,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
				media: image,
			};
		},
	},
});
