import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import React from "react";
import processUrl from "@/lib/processUrl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function CTA({
	link,
	style,
	className,
	children,
	...rest
}: Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement>) {
	// If the variant is a button, render the CTAButton
	if (style === "button" && link) {
		// return <CTAButton ctas={[{ link, style }]} className={className} />;
		return (
			<Link href={link?.internal?.metadata.slug.current || ""} className={cn("", className)}>
				<Button
					className={cn(
						"w-full self-center rounded-full bg-foreground px-6 py-6 text-center",
						"hover:bg-background-secondary hover:text-foreground",
					)}
				>
					{link?.label}
				</Button>
			</Link>
		);
	}

	const props = {
		className: cn(style, className) || undefined,
		children: children || link?.label || link?.internal?.title || link?.external,
		...rest,
	};

	if (link?.type === "internal" && link.internal)
		return (
			<Link
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		);

	if (link?.type === "external" && link.external)
		return <a target="_blank" href={stegaClean(link.external)} {...props} />;

	return props.children;
}
