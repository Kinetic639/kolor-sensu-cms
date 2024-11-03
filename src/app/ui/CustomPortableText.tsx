import {
	type PortableTextComponentProps,
	type PortableTextComponents,
	type PortableTextMarkComponentProps,
} from "@portabletext/react";
import Link from "next/link";
import { type PortableTextListItemBlock } from "@portabletext/types";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import Image from "@/app/ui/modules/RichtextModule/Image";
import { cn } from "@/lib/utils";

interface LinkMark {
	_type: "link";
	href: string;
}

interface CardMark {
	_type: "card";
	color?: {
		label: string;
		value: string;
	};
}

interface TextColorMark {
	_type: "textColor";
	color?: {
		label: string;
		value: string;
	};
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
			<Typography as="h6" variant="h6" className="text-inherit">
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
		blockquote: ({ children }) => (
			<blockquote className="my-4 ml-1 border-l-4 border-gray-300 pl-4 italic text-gray-700">
				{children}
			</blockquote>
		),
	},

	marks: {
		indent: ({ children }) => <span className="ml-8 block">{children}</span>,
		link: ({ children, value }: PortableTextMarkComponentProps<LinkMark>) => {
			const href = value?.href || "#";
			return (
				<Link
					href={href}
					passHref
					target="_blank"
					className="underline hover:text-foreground-hover"
				>
					{children}
				</Link>
			);
		},
		textColor: ({ children, value }: PortableTextMarkComponentProps<TextColorMark>) => {
			const color =
				value?.color?.value
					.replace(/[\u200B-\u200D\uFEFF]/g, "")
					.trim()
					.toLowerCase() || "#fff"; // default to black if no color selected
			return <span style={{ color }}>{children}</span>;
		},

		card: ({ children, value }: PortableTextMarkComponentProps<CardMark>) => {
			// Default color if none selected
			const backgroundColor =
				value?.color?.value
					.replace(/[\u200B-\u200D\uFEFF]/g, "")
					.trim()
					.toLowerCase() || "#DDEEFF";
			// Apply styles directly without `cn` utility to avoid re-render issues
			return (
				<span className={cn("rounded-lg p-2 shadow-md")} style={{ backgroundColor }}>
					{children}
				</span>
			);
		},
	},

	list: {
		bullet: ({ children }) => <ul className="ml-6 list-disc gap-2">{children}</ul>,
		number: ({ children }) => <ol className="ml-6 list-decimal">{children}</ol>,
	},

	listItem: {
		bullet: ({ children }: PortableTextComponentProps<PortableTextListItemBlock>) => (
			<Typography as="li" variant="body1">
				{children}
			</Typography>
		),
		number: ({ children }: PortableTextComponentProps<PortableTextListItemBlock>) => (
			<Typography as="li" variant="body1">
				{children}
			</Typography>
		),
	},

	types: {
		image: Image,
	},
};
