"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState, type FC } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import processUrl from "@/lib/processUrl";
import LinkList from "@/app/ui/LinkList";
import { cn } from "@/lib/utils";

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
	const [isScrolled, setIsScrolled] = useState(false);

	// Update isScrolled based on scroll position when component mounts
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		handleScroll(); // Initial check
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<motion.nav
			initial="hidden"
			animate="visible"
			variants={containerVariants}
			className="hidden w-full flex-1 flex-grow items-center justify-end gap-x-4 px-6 md:flex"
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
									className={cn(
										`relative pb-0.5 text-[18px] font-medium transition-all duration-200`,
										isScrolled
											? "text-foreground-secondary hover:text-slate-300"
											: "text-foreground hover:text-foreground-hover",
										isActive ? "text-foreground-hover" : "",
										isActive && isScrolled && "text-slate-300",
									)}
								>
									{link.label}
								</Link>
							</motion.div>
						);

					case "link.list":
						return <LinkList links={link.links ?? []} link={link.link} key={index} />;

					default:
						return null;
				}
			})}
		</motion.nav>
	);
};
