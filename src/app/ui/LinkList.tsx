"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import CTA from "@/app/ui/CTA/CTA";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { usePageScrolled } from "@/lib/hooks/usePageScrolled";

export default function LinkList({ links }: Sanity.LinkList) {
	const path = usePathname();
	const isScrolled = usePageScrolled();
	const isAnyLinkActive = links?.some((link) => {
		const slug = link.internal?.metadata?.slug?.current;
		return slug === "index" ? path === "/" : slug && path === `/${slug}`;
	});
	return (
		<NavigationMenu>
			<NavigationMenuList className="p-0">
				<NavigationMenuItem className="relative p-0">
					<NavigationMenuTrigger
						className={cn(
							"cursor-default] relative",
							isScrolled
								? "text-foreground-secondary hover:text-[#2e4654]"
								: "text-foreground hover:text-foreground-hover",
							isAnyLinkActive && "text-foreground-hover",
							isAnyLinkActive && isScrolled && "text-slate-300",
						)}
					>
						Newsy
					</NavigationMenuTrigger>
					<NavigationMenuContent className="flex w-fit flex-col items-stretch">
						{links?.map((link, key) => {
							const slug = link.internal?.metadata?.slug?.current;
							const isActive = slug === "index" ? path === "/" : slug && path === `/${slug}`;

							// Ensure `NavigationMenuLink` is used only for external or button types to avoid nested <a> tags.
							const linkComponent = (
								<CTA
									className={cn(
										isActive && "cursor-default",
										"w-full px-2 py-1",
										link.external?.startsWith("http") && "is-external",
									)}
									link={link}
								/>
							);

							return link.type === "external" ? (
								<NavigationMenuLink key={key} className="w-full">
									{linkComponent}
								</NavigationMenuLink>
							) : (
								<div
									key={key}
									className={cn(
										"flex w-full min-w-28 items-center px-3 py-1 text-base transition-colors duration-200",
										isActive
											? "cursor-default bg-[#72a26d] text-foreground-secondary"
											: "cursor-pointer hover:bg-[#72a26d] hover:text-foreground-secondary",
										isActive && isScrolled && "bg-gray-600 text-slate-300",
										!isActive &&
											isScrolled &&
											"cursor-pointer hover:bg-gray-600 hover:text-slate-300",
									)}
								>
									{linkComponent}
								</div>
							);
						})}
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
