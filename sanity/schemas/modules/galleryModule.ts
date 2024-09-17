import { defineType, defineField } from "sanity";

export default defineType({
	name: "galleryModule",
	title: "Gallery Module",
	type: "object",
	fields: [
		defineField({
			name: "title",
			title: "Title",
			type: "string",
		}),
		defineField({
			name: "description",
			title: "Description",
			type: "text",
		}),
		defineField({
			name: "gallery",
			title: "Gallery",
			type: "reference",
			to: [{ type: "gallery" }],
		}),
		defineField({
			name: "showCaptions",
			title: "Show Captions",
			type: "boolean",
			initialValue: true, // Set default to show captions
		}),
		defineField({
			name: "captionStyle",
			title: "Caption Style",
			type: "string",
			options: {
				list: [
					{ title: "Overlay", value: "overlay" },
					{ title: "Aside", value: "aside" },
				],
				layout: "radio", // Radio buttons for selection
			},
			initialValue: "overlay", // Default to overlay
			hidden: ({ parent }) => !parent?.showCaptions, // Hide when captions are not shown
		}),
		defineField({
			name: "captionPosition",
			title: "Caption Position (for Aside style)",
			type: "string",
			options: {
				list: [
					{ title: "Top", value: "top" },
					{ title: "Left", value: "left" },
					{ title: "Right", value: "right" },
				],
				layout: "radio",
			},
			hidden: ({ parent }) => parent?.captionStyle !== "aside" || !parent?.showCaptions, // Show only when 'Aside' is selected and captions are shown
			initialValue: "top", // Default to top when aside is selected
		}),
		defineField({
			name: "captionAlignment",
			title: "Caption Text Alignment",
			type: "string",
			options: {
				list: [
					{ title: "Left", value: "left" },
					{ title: "Center", value: "center" },
					{ title: "Right", value: "right" },
				],
				layout: "radio", // Alignment options
			},
			hidden: ({ parent }) => !parent?.showCaptions, // Only show when captions are enabled
			initialValue: "center", // Default alignment
		}),
	],
	preview: {
		select: {
			title: "title",
			subtitle: "gallery.title",
			media: "gallery.images.0",
		},
		prepare({ title, subtitle, media }) {
			return {
				title,
				subtitle: `Gallery: ${subtitle}`,
				media,
			};
		},
	},
});
