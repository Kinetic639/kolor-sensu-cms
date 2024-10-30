import { defineArrayMember, defineField, defineType } from "sanity";
import { VscEdit } from "react-icons/vsc";
import imageBlock from "../fragments/image-block";

export default defineType({
	name: "blog.post",
	title: "Blog post",
	icon: VscEdit,
	type: "document",
	groups: [{ name: "content", default: true }, { name: "options" }, { name: "seo", title: "SEO" }],
	fields: [
		defineField({
			name: "body",
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
				imageBlock,
			],
			group: "content",
		}),
		defineField({
			name: "categories",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "blog.category" }],
				},
			],
			group: "content",
		}),
		defineField({
			name: "publishDate",
			type: "date",
			validation: (Rule) => Rule.required(),
			group: "content",
		}),
		defineField({
			name: "author",
			title: "Author",
			type: "reference",
			to: [{ type: "specialist" }],
			group: "content",
			description: "Select the author of the blog post from the specialists.",
		}),
		defineField({
			name: "featured",
			type: "boolean",
			group: "options",
			initialValue: false,
		}),
		defineField({
			name: "hideTableOfContents",
			type: "boolean",
			group: "options",
			initialValue: false,
		}),
		defineField({
			name: "metadata",
			type: "metadata",
			group: "seo",
		}),
	],
	preview: {
		select: {
			featured: "featured",
			title: "metadata.title",
			subtitle: "publishDate",
			author: "author.firstName",
			media: "metadata.image",
		},
		prepare: ({ title, subtitle, media, featured, author }) => ({
			title: [featured && "★", title].filter(Boolean).join(" "),
			subtitle: `${subtitle} • by ${author || "Unknown"}`,
			media,
		}),
	},
	orderings: [
		{
			title: "Date",
			name: "date",
			by: [{ field: "publishDate", direction: "desc" }],
		},
		{
			title: "Title",
			name: "metadata.title",
			by: [{ field: "title", direction: "asc" }],
		},
	],
});
