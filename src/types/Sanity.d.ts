import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "next-sanity";

declare global {
	namespace Sanity {
		// Define the `FAQItem` type, which includes question and answer
		export type FAQItem = {
			readonly _type: "faqItem";
			question: string;
			answer: string;
		};

		export type Service = {
			_id: string;
			title: string;
			description: string;
			price: string;
			duration: string;
			points: string[];
			ctas?: CTA[];
		};

		export type ServicesModule = Module<"servicesModule"> & {
			title: string;
			description: string;
			services: Service[];
		};

		export type FAQList = {
			readonly _type: "faqList";
			title: string;
			items: FAQItem[];
		};

		export type GalleryModule = Module<"galleryModule"> & {
			title: string;
			description: string;
			showCaptions: boolean; // Option to show captions
			captionStyle: "overlay" | "aside"; // Style of the captions (overlay or aside)
			captionPosition?: "top" | "left" | "right"; // Position of captions (for aside style)
			captionAlignment?: "left" | "center" | "right"; // Text alignment within the captions
			gallery: {
				_id: string;
				title: string;
				description: string;
				images: {
					asset: {
						url: string;
					};
					alt?: string;
					title: string; // Image title
					description: string; // Image description
				}[];
			};
		};

		export type Specialist = SanityDocument<{
			title: string;
			firstName: string;
			lastName: string;
			ctas?: CTA[];
			shortDescription: string;
			fullDescription: BlockContent;
			image?: Image;
		}>;

		export type Card = {
			readonly _type: "card";
			title: string;
			image: Sanity.Image;
			frontText: string;
			hoverText?: string;
			faqList?: FAQList; // Optional related FAQ list
		};

		export type Document = {
			title?: string;
			metadata?: {
				slug: { current: string };
				title: string;
				description: string;
				image?: Image;
				ogimage?: string;
				noIndex: boolean;
			};
		};
		// Use the Block export type from Sanity for block content
		export type SanityBlock = Block;

		// If your content might include custom types or other block-like content, you might define a more specific type:
		export type BlockContent = SanityBlock[];

		// documents

		export type Site = SanityDocument<{
			title: string;
			logo?: Logo;
			announcements?: Announcement[];
			ctas?: CTA[];
			headerMenu?: Navigation;
			footerMenu?: Navigation;
			footerDescription?: BlockContent;
			social?: Navigation;
			copyright?: BlockContent;
			ogimage?: string;
		}>;

		export type Navigation = SanityDocument<{
			title: string;
			items?: (Link | LinkList)[];
		}>;

		export type Announcement = SanityDocument<{
			content: BlockContent;
			copyright?: BlockContent;
			cta?: Link;
			start?: string;
			end?: string;
		}>;

		// pages

		export type PageBase = SanityDocument<{
			title?: string;
			metadata: Metadata;
		}>;

		export type Page = PageBase & {
			readonly _type: "page";
			modules?: Module[];
		};

		export type BlogPost = PageBase & {
			readonly _type: "blog.post";
			body: BlockContent;
			readTime: number;
			headings?: { style: string; text: string }[];
			categories: BlogCategory[];
			featured: boolean;
			hideTableOfContents: boolean;
			publishDate: string;
		};

		export type BlogCategory = SanityDocument<{
			title: string;
		}>;

		// miscellaneous

		export type Logo = SanityDocument<{
			name: string;
			image?: Partial<{
				default: Image;
				light: Image;
				dark: Image;
			}>;
		}>;
		// objects

		export type CTA = {
			link?: Link;
			style?: string;
		};

		export type Image = SanityImageObject &
			Partial<{
				alt: string;
				frameStyle: "rectangle" | "circle" | "blob";
				loading: "lazy" | "eager";
			}>;

		export type Link = {
			readonly _type: "link";
			label: string;
			type: "internal" | "external";
			internal?: Page | BlogPost;
			external?: string;
			params?: string;
		};

		export type LinkList = {
			readonly _type: "link.list";
			link: Link;
			links?: Link[];
		};

		export type Metadata = {
			slug: { current: string };
			title: string;
			description: string;
			image?: Image;
			ogimage?: string;
			noIndex: boolean;
		};

		export type Module<T = string> = {
			_type: T;
			_key: string;
			uid?: string;
		};
		// Define a module for specialists
		export type SpecialistsModule = Module<"specialistsModule"> & {
			title: string;
			specialists: Specialist[];
		};
	}
}

export {};
