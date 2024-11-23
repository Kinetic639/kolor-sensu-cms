"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import processUrl from "@/lib/processUrl";
import "./cta.css";
import { cleanText } from "@/lib/cleanText";

// Define allowed color keys for type safety
type ColorOptions = "primary" | "secondary" | "accent" | "neutral";

export default function CTA({
	link,
	type,
	style = "solid",
	className,
	color = "primary", // Default color
	children,
	...rest
}: Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement> & { color?: ColorOptions }) {
	const cleanedType = cleanText(type || "");

	console.log(cleanedType);
	// Handle button with gradient style
	if (cleanedType === "button" && style === "gradient" && link) {
		return (
			<Link
				href={link?.internal?.metadata.slug.current || ""}
				className={cn("flex justify-center max-md:mx-auto lg:justify-start", className)}
			>
				<motion.div
					whileHover={{ scale: 1.05 }} // Add hover effect
					whileTap={{ scale: 0.95 }} // Tap effect
					className="transition-transform duration-300 ease-in-out"
				>
					<div className="button-container">
						<div className="btn">
							<span className="font-medium">{link?.label}</span>
						</div>
					</div>
				</motion.div>
			</Link>
		);
	}

	if (cleanedType === "outline" && link) {
		return (
			<Link
				href={link?.internal?.metadata.slug.current || ""}
				className={cn("max-md:mx-auto", className)}
			>
				<motion.div
					whileHover={{ scale: 1.05 }} // Add hover effect
					whileTap={{ scale: 0.95 }} // Tap effect
					className="transition-transform duration-200 ease-in-out"
				>
					<Button
						className={cn(
							"w-full min-w-44 self-center rounded-full border border-purple-700 bg-transparent p-7 px-8 text-center text-base lowercase text-purple-700 transition-all duration-200 ease-in-out hover:bg-purple-700 hover:text-white max-md:mx-auto",
						)}
					>
						{link?.label}
					</Button>
				</motion.div>
			</Link>
		);
	}

	// Handle all other types of buttons (e.g., solid)
	if (cleanedType === "button" && link) {
		const colorClasses: { primary: string; secondary: string; accent: string; neutral: string } = {
			primary: "bg-blue-500  hover:bg-blue-600",
			secondary: "bg-gray-500  hover:bg-gray-600",
			accent: "bg-yellow-400  text-foreground hover:bg-yellow-300",
			neutral: "bg-gray-200 text-black hover:bg-gray-300",
		};

		return (
			<Link
				href={link?.internal?.metadata.slug.current || ""}
				className={cn("max-md:mx-auto", className)}
			>
				<motion.div
					whileHover={{ scale: 1.05 }} // Add hover effect
					whileTap={{ scale: 0.95 }} // Tap effect
					className="transition-transform duration-200 ease-in-out"
				>
					<Button
						className={cn(
							"w-full self-center rounded-full p-7 text-center text-base uppercase transition-all duration-200 ease-in-out max-md:mx-auto",
							colorClasses[color], // Use selected color
						)}
					>
						{link?.label}
					</Button>
				</motion.div>
			</Link>
		);
	}

	// Handle other types of CTAs (internal or external links)
	const props = {
		className: cn(cleanedType, className) || undefined,
		children: children || link?.label || link?.internal?.title || link?.external,
		...rest,
	};

	if (link?.type === "internal" && link.internal) {
		return (
			<Link
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		);
	}

	if (link?.type === "external" && link.external) {
		return <a target="_blank" href={link.external} {...props} />;
	}

	return props.children;
}
