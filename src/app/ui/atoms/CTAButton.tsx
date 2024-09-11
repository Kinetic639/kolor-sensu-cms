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
					"bg-foreground w-full self-center rounded-full px-6 py-6 text-center",
					isScrolled
						? "hover:text-foreground hover:bg-background"
						: "hover:text-background hover:bg-background-secondary",
				)}
			>
				{ctas[0]?.link?.label}
			</Button>
		</Link>
	);
};
