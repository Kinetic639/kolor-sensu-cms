import {
	type PortableTextComponentProps,
	type PortableTextComponents,
	type PortableTextMarkComponentProps,
} from "@portabletext/react";
import Link from "next/link";
import Image from "next/image";
import { type PortableTextListItemBlock } from "@portabletext/types";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

// Define a type for the link mark
interface LinkMark {
	_type: "link";
	href: string;
}

export const customPortableTextComponents: PortableTextComponents = {
	block: {
		h1: ({ children }) => (
			<Typography as="h1" variant="h1">
				{children}
			</Typography>
		),
		h2: ({ children }) => (
			<Typography as="h2" variant="h2">
				{children}
			</Typography>
		),
		h3: ({ children }) => (
			<Typography as="h3" variant="h3">
				{children}
			</Typography>
		),
		h4: ({ children }) => (
			<Typography as="h4" variant="h4">
				{children}
			</Typography>
		),
		h5: ({ children }) => (
			<Typography as="h5" variant="h5">
				{children}
			</Typography>
		),
		h6: ({ children }) => (
			<Typography as="h6" variant="h6" className="text-center md:text-left">
				{children}
			</Typography>
		),
		normal: ({ children }) => (
			<Typography as="p" variant="body1">
				{children}
			</Typography>
		),
		caption: ({ children }) => (
			<Typography as="p" variant="caption">
				{children}
			</Typography>
		),
		body2: ({ children }) => (
			<Typography as="p" variant="body2">
				{children}
			</Typography>
		),
	},
	marks: {
		// Replace any with the correct type for link mark
		link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
			const href = value?.href || "#";
			return (
				<Link href={href} passHref>
					<a className="text-blue-600 underline">{children}</a>
				</Link>
			);
		},
	},
	list: {
		// Styling for the top-level bullet list
		bullet: ({ children }) => <ul className="mb-4 ml-6 list-outside list-disc">{children}</ul>,
		// Styling for the top-level numbered list
		number: ({ children }) => <ol className="mb-4 ml-6 list-outside list-decimal">{children}</ol>,
	},
	listItem: {
		// Styling for nested bullet list items
		bullet: ({ children }: PortableTextComponentProps<PortableTextListItemBlock>) => (
			<Typography as="li" variant="body1" className="mb-1">
				{children}
				{/* Target nested lists for styling */}
				<ul className="ml-6 list-disc">{children}</ul>
			</Typography>
		),
		// Styling for nested numbered list items
		number: ({ children }: PortableTextComponentProps<PortableTextListItemBlock>) => (
			<Typography as="li" variant="body1" className="mb-2">
				{children}
				<ol className="ml-6 list-decimal">{children}</ol>
			</Typography>
		),
	},
	types: {
		image: ({ value }: PortableTextComponentProps<{ asset: { url: string }; alt: string }>) => (
			<div className="my-8">
				<Image
					src={value.asset.url || ""}
					alt={value.alt || "Image"}
					className="w-full rounded-lg"
					width={1200}
					height={800}
					layout="responsive"
				/>
			</div>
		),
	},
};
