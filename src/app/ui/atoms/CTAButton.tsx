"use client";
import React, { type FC } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePageScrolled } from "@/lib/hooks/usePageScrolled";
import { cn } from "@/lib/utils";
interface CTAButtonProps {
	className?: string;
	ctas: Sanity.CTA[];
}

export const CTAButton: FC<CTAButtonProps> = ({ ctas, className }) => {
	const isScrolled = usePageScrolled();

	if (!ctas || !ctas[0]?.link?.internal?.metadata.slug.current) return null;
	return (
		<Link href={ctas[0]?.link?.internal?.metadata.slug.current} className={cn("", className)}>
			<Button
				className={cn(
					"w-full self-center rounded-full bg-foreground px-6 py-6 text-center",
					isScrolled
						? "hover:bg-background hover:text-foreground"
						: "hover:bg-background-secondary hover:text-background",
				)}
			>
				{ctas[0]?.link?.label}
			</Button>
		</Link>
	);
};
