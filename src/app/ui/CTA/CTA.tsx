"use client";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import processUrl from "@/lib/processUrl";
import "./cta.css";

export default function CTA({
	link,
	type,
	style = "solid",
	className,
	children,
	...rest
}: Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement>) {
	// Handle button with gradient style
	if (type === "button" && style === "gradient" && link) {
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

	// Handle all other types of buttons (e.g., solid)
	if (type === "button" && link) {
		return (
			<Link
				href={link?.internal?.metadata.slug.current || ""}
				className={cn("max-md:mx-auto", className)}
			>
				<motion.div
					whileHover={{ scale: 1.05 }} // Add hover effect
					whileTap={{ scale: 0.95 }} // Tap effect
					className="transition-transform duration-300 ease-in-out"
				>
					<Button
						className={cn(
							"w-full self-center rounded-full p-7 text-center text-base uppercase transition-all duration-300 ease-in-out max-md:mx-auto",
							style === "solid"
								? "max-w-sm bg-foreground text-background hover:bg-background-secondary max-md:mx-auto"
								: "",
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
		className: cn(type, className) || undefined,
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
