"use client";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import CTA from "@/app/ui/CTA";
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
	return (
		<NavigationMenu>
			<NavigationMenuList className="p-0">
				<NavigationMenuItem className="p-0">
					<NavigationMenuTrigger isScrolled={isScrolled} className="font-[28px]">
						Newsy
					</NavigationMenuTrigger>
					<NavigationMenuContent className="flex w-fit flex-col items-stretch">
						{links?.map((link, key) => {
							// Get the slug from the internal link's metadata
							const slug = link.internal?.metadata?.slug?.current;

							// Determine if the link is active
							const isActive = slug === "index" ? path === "/" : slug && path === `/${slug}`;

							return (
								<NavigationMenuLink
									key={key}
									className={cn(
										"flex w-full min-w-28 items-center px-3 py-1 text-base text-foreground transition-colors duration-200",
										isActive
											? "cursor-default text-foreground"
											: "cursor-pointer hover:bg-[#72a26d] hover:text-foreground-secondary",
									)}
								>
									<CTA
										className={cn(
											"w-full px-2 py-1",
											isActive ? "cursor-default text-foreground" : "cursor-pointer",
											link.external?.startsWith("http") && "is-external",
										)}
										link={link}
									/>
								</NavigationMenuLink>
							);
						})}
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}
