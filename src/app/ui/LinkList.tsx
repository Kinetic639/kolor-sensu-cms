"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CTA from "@/app/ui/CTA";

export default function LinkList({ links }: Sanity.LinkList) {
	const path = usePathname();
	return (
		<ul className="flex flex-col gap-2 text-sm">
			{links?.map((link, key) => {
				// Get the slug from the internal link's metadata
				const slug = link.internal?.metadata?.slug?.current;

				// Determine if the link is active
				const isActive = slug === "index" ? path === "/" : slug && path === `/${slug}`;

				return (
					<li key={key}>
						<CTA
							className={cn(
								"hover:text-foreground",
								isActive ? "text-foreground" : "",
								link.external?.startsWith("http") && "is-external",
							)}
							link={link}
						/>
					</li>
				);
			})}
		</ul>
	);
}
