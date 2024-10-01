"use client";
import { motion } from "framer-motion";
import React, { type FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import processUrl from "@/lib/processUrl";
import { usePageScrolled } from "@/lib/hooks/usePageScrolled";
import LinkList from "@/app/ui/LinkList";

interface DesktopNavigationProps {
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

export const DesktopNavigation: FC<DesktopNavigationProps> = ({ headerMenu }) => {
	const path = usePathname();
	const isScrolled = usePageScrolled();

	return (
		<motion.nav
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="hidden w-full flex-1 flex-grow items-center gap-x-4 px-6 md:flex"
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
								<Link
									href={processUrl(link.internal!, {
										base: false,
										params: link.params,
									})}
									className={`relative pb-0.5 text-[18px] font-medium capitalize transition-all ${
										isActive ? "text-foreground" : ""
									} ${isScrolled ? "text-foreground-secondary hover:text-[#2e4654]" : "text-foreground hover:text-foreground-hover"} `}
								>
									{isActive && (
										<motion.span
											initial={{ y: "-100%" }}
											animate={{ y: 0 }}
											transition={{ type: "tween" }}
											layoutId="underline"
											className={`absolute left-0 top-full h-[2px] w-full ${isScrolled ? "bg-foreground-secondary" : "bg-foreground"}`}
										/>
									)}
									{link.label}
								</Link>
							</motion.div>
						);

					case "link.list":
						return <LinkList {...link} key={index} />;

					default:
						return null;
				}
			})}
		</motion.nav>
	);
};
