import { defineField, defineType } from "sanity";
import { VscHome, VscEyeClosed, VscQuestion, VscEdit } from "react-icons/vsc";

interface PreviewParams {
	title: string;
	slug: string;
	media?: string | null;
	noindex?: boolean;
}

export default defineType({
	name: "page",
	title: "Page",
	type: "document",
	groups: [
		{ name: "content", default: true },
		{ name: "seo", title: "SEO" },
	],
	fields: [
		defineField({
			name: "title",
			type: "string",
			group: "content",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "modules",
			description: "Page content",
			type: "array",
			of: [
				{ type: "blog-list" },
				{ type: "blog-post-content" },
				{ type: "hero" },
				{ type: "hero.saas" },
				{ type: "hero.split" },
				{ type: "hero.mosaic" },
				{ type: "hero.modern" },
				{ type: "banner" },
				{ type: "cardsSection" },
				{ type: "specialistsModule" },
				{ type: "galleryModule" },
				{ type: "faqModule" },
				{ type: "servicesModule" },
				{ type: "contactModule" },
				{ type: "consultationTestModule" },
				{ type: "productsModule" },
				{ type: "podcastModule" },
				{ type: "splitContent" },
				{ type: "bannerText" },
				{ type: "hero.withCard" },
				{ type: "actionBanner" },
				{ type: "embeddedPage" },
				{ type: "richtextModule" },
			],
			options: {
				insertMenu: {
					views: [{ name: "list" }, { name: "grid" }],
					groups: [
						{
							name: "Hero Sections",
							title: "Hero",
							of: ["hero", "hero.saas", "hero.split", "hero.mosaic"],
						},
						{
							name: "Content Sections",
							title: "Content",
							of: ["banner", "cardsSection", "faqModule", "galleryModule"],
						},
						{
							name: "Specialists & Services",
							title: "Specialists & Services",
							of: ["specialistsModule", "servicesModule"],
						},
						{
							name: "Forms & Interaction",
							title: "Forms & Interaction",
							of: ["contactModule", "consultationTestModule"],
						},
					],
				},
			},
			group: "content",
		}),
		defineField({
			name: "metadata",
			type: "metadata",
			group: "seo",
		}),
	],
	preview: {
		select: {
			title: "title",
			slug: "metadata.slug.current",
			media: "metadata.image",
			noindex: "metadata.noIndex",
		},
		prepare: ({ title, slug, media, noindex }: PreviewParams) => ({
			title,
			subtitle: slug && (slug === "index" ? "/" : `/${slug}`),
			media:
				media ||
				(slug === "index" && VscHome) ||
				(slug === "404" && VscQuestion) ||
				(["blog", "blog/*"].includes(slug) && VscEdit) ||
				(noindex && VscEyeClosed),
		}),
	},
});
