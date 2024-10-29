import type { SanityImageObject } from "@sanity/image-url/lib/types/types";
import type { SanityDocument } from "next-sanity";

declare global {
	namespace Sanity {
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

		export type Product = {
			_id: string;
			title: string;
			description: string;
			image: Sanity.Image;
			link: string;
		};

		export type ProductsModule = Module<"productsModule"> & {
			title: string;
			description?: string;
			products: Product[];
		};

		export type FAQList = {
			readonly _type: "faqList";
			title: string;
			items: FAQItem[];
		};

		export type GalleryModule = Module<"galleryModule"> & {
			title: string;
			description: string;
			showCaptions: boolean;
			captionStyle: "overlay" | "aside";
			captionPosition?: "top" | "left" | "right";
			captionAlignment?: "left" | "center" | "right";
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
			faqList?: FAQList;
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

		export type SanityBlock = Block;

		export type BlockContent = SanityBlock[];

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

		export type Logo = SanityDocument<{
			name: string;
			image?: Partial<{
				default: Image;
				light: Image;
				dark: Image;
			}>;
		}>;

		export type CTA = {
			link?: Link;
			style?: string;
			type?: string;
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

		export type SpecialistsModule = Module<"specialistsModule"> & {
			title: string;
			specialists: Specialist[];
		};
	}
}

export {};
