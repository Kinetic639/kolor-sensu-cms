"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import processUrl from "@/lib/processUrl";
import { usePageScrolled } from "@/lib/hooks/usePageScrolled";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarMenuProps {
	className?: string;
	ctas: Sanity.CTA[];
	headerMenu: Sanity.Navigation;
}

const linkVariants = {
	hidden: { opacity: 0, y: 0 },
	visible: { opacity: 1, y: 0 },
};

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.01,
		},
	},
};

export const SidebarMenuDrawer: React.FC<SidebarMenuProps> = ({ headerMenu, ctas }) => {
	const path = usePathname();
	const isScrolled = usePageScrolled();
	return (
		<div className="flex flex-col gap-4">
			<motion.nav
				initial="hidden"
				animate="visible"
				variants={containerVariants}
				className="flex w-full flex-col gap-6 py-12"
			>
				{headerMenu?.items?.map((link, index) => {
					switch (link._type) {
						case "link":
							// Get the slug from the internal link's metadata
							const slug = link.internal?.metadata?.slug?.current;

							// Determine if the link is active
							const isActive = slug === "index" ? path === "/" : slug && path === `/${slug}`;

							return (
								<motion.div key={index} variants={linkVariants}>
									<SheetClose asChild>
										<Link
											href={processUrl(link.internal!, {
												base: false,
												params: link.params,
											})}
											className={cn(
												`relative pb-0.5 text-xl font-medium capitalize text-foreground transition-all hover:text-foreground-hover`,
												isActive && "text-foreground-hover",
											)}
										>
											{link.label}
										</Link>
									</SheetClose>
								</motion.div>
							);

						case "link.list":
							// Only render the top-level link (e.g., "Newsy"), not its sub-links
							if (link.link) {
								const topSlug = link.link.internal?.metadata?.slug?.current;
								const isActive =
									topSlug === "index" ? path === "/" : topSlug && path === `/${topSlug}`;

								return (
									<motion.div key={index} variants={linkVariants}>
										<SheetClose asChild>
											<Link
												href={topSlug ? `/${topSlug}` : "#"}
												className={cn(
													"relative pb-0.5 text-xl font-medium capitalize text-foreground transition-all hover:text-foreground-hover",
													isActive && "text-foreground-hover",
												)}
											>
												{link.link.label}
											</Link>
										</SheetClose>
									</motion.div>
								);
							}
							return null;

						default:
							return null;
					}
				})}
			</motion.nav>
			<SheetClose asChild>
				{ctas[0]?.link?.internal?.metadata?.slug?.current ? (
					<Link href={`/${ctas[0].link.internal.metadata.slug.current}`} className={cn("")}>
						<Button
							className={cn(
								"mr-4 w-full self-center rounded-full bg-foreground px-6 py-6 text-center",
								isScrolled
									? "hover:bg-background hover:text-foreground"
									: "hover:bg-background-secondary hover:text-background",
							)}
						>
							{ctas[0]?.link?.label}
						</Button>
					</Link>
				) : null}
			</SheetClose>
		</div>
	);
};
