import { defineType, defineField } from "sanity";

export default defineType({
	name: "podcastModule",
	title: "Podcast Module",
	type: "object",
	fields: [
		defineField({
			name: "enabled",
			type: "boolean",
			title: "Enable Podcast Module",
			initialValue: true, // Set a default value to avoid needing to interact with it
			hidden: true, // Hide this field in the CMS
		}),
	],
});
