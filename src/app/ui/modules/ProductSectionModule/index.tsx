import Link from "next/link";
import {
	PortableText,
	type PortableTextBlock,
	type PortableTextReactComponents,
} from "@portabletext/react";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";

interface ProductSection {
	sectionTitle: string;
	description: PortableTextBlock[];
	image?: {
		asset: {
			_id: string;
			url: string;
		};
		alt?: string;
	};
	reversed: boolean;
	link: {
		_type: string;
		external?: string;
		internal?: {
			_type: string;
			title: string;
			metadata?: {
				slug?: {
					current: string;
				};
			};
		};
		label: string;
		newTab?: boolean;
	};
	productType: "courses" | "freeMaterials";
}

type ProductSectionModuleProps = ProductSection;

interface LinkMark {
	_type: "link";
	href: string;
}

interface ColorMark {
	_type: "card" | "textColor";
	color: string;
}

const portableTextComponents: Partial<PortableTextReactComponents> = {
	block: {
		h2: ({ children }) => <h2 className="mb-4 text-2xl font-bold">{children}</h2>,
		h3: ({ children }) => <h3 className="mb-3 text-xl font-bold">{children}</h3>,
		h4: ({ children }) => <h4 className="mb-2 text-lg font-bold">{children}</h4>,
		h5: ({ children }) => <h5 className="mb-2 text-base font-bold">{children}</h5>,
		h6: ({ children }) => <h6 className="mb-2 text-sm font-bold">{children}</h6>,
		blockquote: ({ children }) => (
			<blockquote className="my-4 border-l-4 border-primary pl-4 italic">{children}</blockquote>
		),
		caption: ({ children }) => <p className="text-sm text-gray-600">{children}</p>,
		body2: ({ children }) => <p className="text-base text-gray-700">{children}</p>,
		normal: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
	},
	marks: {
		link: ({ value, children }) => {
			const mark = value as LinkMark | undefined;
			return mark?.href ? (
				<a
					href={mark.href}
					className="text-primary hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</a>
			) : (
				<>{children}</>
			);
		},
		card: ({ value, children }) => {
			const mark = value as ColorMark | undefined;
			return (
				<span
					className="rounded px-2 py-1"
					style={{ backgroundColor: mark?.color || "transparent" }}
				>
					{children}
				</span>
			);
		},
		textColor: ({ value, children }) => {
			const mark = value as ColorMark | undefined;
			return <span style={{ color: mark?.color || "inherit" }}>{children}</span>;
		},
	},
};

export default function ProductSectionModule(props: ProductSectionModuleProps) {
	const getLinkUrl = (link: ProductSection["link"]) => {
		if (link.external) return link.external;
		if (link.internal?.metadata?.slug?.current) return `/${link.internal.metadata.slug.current}`;
		return "/";
	};

	return (
		<section className="py-16">
			<div className="mx-auto max-w-7xl px-4">
				<div className="grid items-center gap-8 md:grid-cols-2">
					{props.image && (
						<div
							className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl ${props.reversed ? "md:order-last" : ""}`}
						>
							<Img
								image={props.image}
								alt={props.sectionTitle}
								className="object-cover"
								sizes="(max-width: 768px) 100vw, 50vw"
							/>
						</div>
					)}

					<div
						className={`flex flex-col gap-6 text-center md:text-left ${
							props.reversed ? "md:text-right" : ""
						}`}
					>
						<h2 className="text-3xl font-bold md:text-4xl">{props.sectionTitle}</h2>
						<div className="prose prose-lg max-w-none text-gray-600">
							<PortableText value={props.description} components={portableTextComponents} />
						</div>
						<div className="mt-4 flex justify-center self-center">
							{props.link.external ? (
								<Link
									href={props.link.external}
									target={props.link.newTab ? "_blank" : undefined}
									rel={props.link.newTab ? "noopener noreferrer" : undefined}
									className={cn(
										"inline-flex min-w-44 items-center justify-center rounded-full bg-foreground p-5 px-10 text-base text-white transition-all duration-200 hover:bg-[#c4d6c2] hover:text-foreground",
									)}
								>
									{props.link.label}
								</Link>
							) : (
								<Link
									href={getLinkUrl(props.link)}
									className={cn(
										"inline-flex min-w-44 items-center justify-center rounded-full bg-foreground p-5 px-10 text-base text-white transition-all duration-200 hover:bg-[#c4d6c2] hover:text-foreground",
									)}
								>
									{props.link.label}
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
