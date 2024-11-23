"use client";
import { PortableText } from "@portabletext/react";
import { usePathname } from "next/navigation";
import CTA from "@/app/ui/CTA/CTA";
import Social from "@/app/ui/Social";
import { cn } from "@/lib/utils";

type NavigationProps = {
	footerMenu?: Sanity.Navigation;
	social?: Sanity.Navigation;
	footerDescription?: Sanity.BlockContent;
};

export default function Navigation({ footerMenu, footerDescription, social }: NavigationProps) {
	const path = usePathname();
	return (
		<nav className="flex w-full flex-wrap justify-center gap-x-12 gap-y-6">
			<div className="flex flex-col flex-wrap gap-x-6 gap-y-2 text-sm">
				<span className="font-bold">Kontakt</span>
				<span>
					tel:{" "}
					<a className="hover:text-foreground" href="tel:533026599">
						533-026-599
					</a>
				</span>
				<span>
					email:{" "}
					<a className="hover:text-foreground" href="mailto:kolorsensu@gmail.com">
						kolorsensu@gmail.com
					</a>
				</span>
			</div>
			{footerDescription && (
				<div className="flex flex-col flex-wrap justify-start gap-x-6 gap-y-2 text-sm">
					<PortableText value={footerDescription} />
				</div>
			)}
			{footerMenu?.items?.map((item, key) => {
				switch (item._type) {
					case "link":
						return <CTA className="hover:link md:px-3" link={item} key={key} />;

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
			{social && (
				<div className="text-sms flex flex-col items-center gap-2">
					<span className="text-sm font-bold">Social Media</span>
					<Social social={social} />
				</div>
			)}
		</nav>
	);
}
