import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "next-sanity";



declare global {
	namespace Sanity {
		type Document = {
			title?: string;
			metadata?: {
				slug: { current: string };
				title: string;
				description: string;
				image?: Image;
				ogimage?: string;
				noIndex: boolean;
			};
		}
		// Use the Block type from Sanity for block content
		type SanityBlock = Block;

		// If your content might include custom types or other block-like content, you might define a more specific type:
		type BlockContent = SanityBlock[];

		// documents

		type Site = SanityDocument<{
			title: string;
			logo?: Logo;
			announcements?: Announcement[];
			ctas?: CTA[];
			headerMenu?: Navigation;
			footerMenu?: Navigation;
			social?: Navigation;
			copyright?: BlockContent;
			ogimage?: string;
		}>;

		type Navigation = SanityDocument<{
			title: string;
			items?: (Link | LinkList)[];
		}>;

		type Announcement = SanityDocument<{
			copyright?: BlockContent;
			cta?: Link;
			start?: string;
			end?: string;
		}>;

		// pages

		type PageBase = SanityDocument<{
			title?: string;
			metadata: Metadata;
		}>;

		type Page = PageBase & {
			readonly _type: "page";
			modules?: Module[];
		};

		type BlogPost = PageBase & {
			readonly _type: "blog.post";
			body: BlockContent;
			readTime: number;
			headings?: { style: string; text: string }[];
			categories: BlogCategory[];
			featured: boolean;
			hideTableOfContents: boolean;
			publishDate: string;
		};

		type BlogCategory = SanityDocument<{
			title: string;
		}>;

		// miscellaneous

		type Logo = SanityDocument<{
			name: string;
			image?: Partial<{
				default: Image;
				light: Image;
				dark: Image;
			}>;
		}>;
		// objects

		type CTA = {
			link?: Link;
			style?: string;
		};

		type Image = SanityImageObject &
			Partial<{
				alt: string;
				loading: "lazy" | "eager";
			}>;

		type Link = {
			readonly _type: "link";
			label: string;
			type: "internal" | "external";
			internal?: Page | BlogPost;
			external?: string;
			params?: string;
		};

		type LinkList = {
			readonly _type: "link.list";
			link: Link;
			links?: Link[];
		};

		type Metadata = {
			slug: { current: string };
			title: string;
			description: string;
			image?: Image;
			ogimage?: string;
			noIndex: boolean;
		};

		type Module<T = string> = {
			_type: T;
			_key: string;
			uid?: string;
		};
	}
}

export {};
