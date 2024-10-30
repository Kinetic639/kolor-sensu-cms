"use client";
import React, { type FC, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface CTAButtonProps {
	className?: string;
	ctas: Sanity.CTA[];
}

export const CTAButton: FC<CTAButtonProps> = ({ ctas, className }) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		handleScroll(); // Initial check
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (!ctas || !ctas[0]?.link?.internal?.metadata.slug.current) return null;
	return (
		<Link href={ctas[0]?.link?.internal?.metadata.slug.current} className={cn("", className)}>
			<Button
				className={cn(
					"w-full self-center rounded-full bg-foreground px-6 py-6 text-center",
					isScrolled
						? "bg-background text-foreground hover:bg-foreground hover:text-background"
						: "hover:bg-background-secondary hover:text-background",
				)}
			>
				{ctas[0]?.link?.label}
			</Button>
		</Link>
	);
};
