import { defineField, defineType } from "sanity";
import { VscEdit } from "react-icons/vsc";

export default defineType({
	name: "blog-post-content",
	title: "Blog post content",
	icon: VscEdit,
	type: "object",
	fields: [
		defineField({
			name: "uid",
			title: "Unique Identifier",
			type: "uid",
		}),
	],
	preview: {
		prepare: () => ({
			title: "Blog post content",
		}),
	},
});
