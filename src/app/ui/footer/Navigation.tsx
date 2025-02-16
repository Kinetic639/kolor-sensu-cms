"use client";
import { usePathname } from "next/navigation";
import CTA from "@/app/ui/CTA/CTA";
import { cn } from "@/lib/utils";

type NavigationProps = {
	logo?: Sanity.Image;
	footerMenu?: Sanity.Navigation;
	social?: Sanity.Navigation;
	footerDescription?: Sanity.BlockContent;
};

export default function Navigation({ footerMenu }: NavigationProps) {
	const path = usePathname();
	return (
		<nav className="flex flex-wrap justify-center gap-x-12 gap-y-6">
			{footerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case "link":
						const slug = item.internal?.metadata?.slug?.current;
						// Determine if the link is active
						const isActive = slug === "index" ? path === "/" : slug && path === `/${slug}`;
						return (
							<CTA
								className={cn(
									"text-sm transition-colors duration-150 hover:text-slate-300 hover:text-white md:px-3",
									isActive && "text-foreground",
								)}
								link={item}
								key={key}
							/>
						);

					case "link.list":
						return (
							<div key={key} className="text-sms flex flex-col gap-2">
								<span className="text-sm font-bold">{item.link.label}</span>
								{item?.links?.map((link, key) => {
									const slug = link.internal?.metadata?.slug?.current;

									// Determine if the link is active
									const isActive = slug === "index" ? path === "/" : slug && path === `/${slug}`;
									return (
										<CTA
											className={cn(
												"hover:link text-sm transition-colors duration-150 hover:text-slate-300 md:px-3",
												isActive && "text-foreground",
											)}
											link={link}
											key={key}
										/>
									);
								})}
							</div>
						);

					default:
						return null;
				}
			})}
		</nav>
	);
}
