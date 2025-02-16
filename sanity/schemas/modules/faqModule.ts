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
			validation: (Rule) => Rule.required().min(3).max(100),
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
			validation: (Rule) => Rule.required().min(10).max(500),
		}),
		defineField({
			name: "showDescription",
			title: "Show Description",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "faqNavigations",
			title: "Select FAQ Navigations",
			type: "array",
			of: [
				defineField({
					name: "faqNavigation",
					title: "FAQ Navigation",
					type: "object",
					fields: [
						defineField({
							name: "navigation",
							title: "Navigation",
							type: "reference",
							to: [{ type: "faqNavigation" }],
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: "showTitle",
							title: "Show Title",
							type: "boolean",
							initialValue: true,
						}),
					],
				}),
			],
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
					validation: (Rule) => Rule.required().min(3).max(150),
				}),
			],
		}),
		defineField({
			name: "showImage",
			title: "Show Image",
			type: "boolean",
			initialValue: true,
		}),
		defineField({
			name: "footerHeading",
			title: "Footer Heading",
			type: "string",
			description: "Optional heading to display at the end of the FAQ section.",
		}),
		defineField({
			name: "footerText",
			title: "Footer Text",
			type: "text",
			description: "Optional text to display at the end of the FAQ section.",
		}),
	],
	preview: {
		select: {
			title: "title",
			showTitle: "showTitle",
			showDescription: "showDescription",
			description: "description",
			faqNavigations: "faqNavigations",
			image: "image",
			showImage: "showImage",
			footerHeading: "footerHeading",
			footerText: "footerText",
		},
		prepare({
			title,
			showTitle,
			showDescription,
			description,
			faqNavigations = [],
			image,
			showImage,
			footerHeading,
			footerText,
		}) {
			const subtitleText =
				showDescription && description ? `${description.slice(0, 50)}...` : "No description";
			const titleText = showTitle ? title : "Title hidden";
			const imageText = showImage && image ? "Image displayed" : "No image";

			const faqNavigationTitles = faqNavigations.length
				? faqNavigations
						.filter(
							(nav: { showTitle: boolean; navigation: { title: string } }) =>
								nav?.showTitle && nav?.navigation?.title,
						)
						.map(
							(nav: { showTitle: boolean; navigation: { title: string } }) => nav.navigation.title,
						)
						.join(", ")
				: "No FAQ Navigation Selected";

			return {
				title: titleText,
				subtitle: `FAQ: ${faqNavigationTitles} - ${subtitleText} - ${imageText}`,
				media: image || VscSymbolClass, // Default icon if no image is provided
			};
		},
	},
});
