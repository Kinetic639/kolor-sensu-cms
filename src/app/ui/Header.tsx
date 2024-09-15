import React from "react";
import Link from "next/link";
import { getSite } from "@/lib/sanity/getSite";
import { cn } from "@/lib/utils";
import Img from "@/app/ui/Img";
import { DesktopNavigation } from "@/app/ui/DesktopNavigation";
import { NavAnimatedBackground } from "@/app/ui/atoms/NavAnimatedBackground";
import { CTAButton } from "@/app/ui/atoms/CTAButton";
import { SideDrawer } from "@/app/ui/SideDrawer";

export const Header = async () => {
	const { headerMenu, title, logo, ctas } = await getSite();
	const logoImage = logo?.image?.dark || logo?.image?.default;
	return (
		<div
			className={cn(
				"sticky top-0 z-50 mx-auto flex w-full justify-center bg-background-secondary md:bg-transparent",
			)}
		>
			<div
				className={cn(
					"relative mx-auto flex w-full max-w-screen-xl items-center justify-between gap-x-6 py-2",
				)}
			>
				<NavAnimatedBackground />
				<Link
					className={cn("h3 md:h2 ml-2.5 inline-block", logo?.image && "max-w-[250px]")}
					href="/"
				>
					{logoImage && (
						<Img
							className="inline-block max-h-[2.2em] w-auto"
							image={logoImage}
							alt={logo?.name || title}
						/>
					)}
				</Link>
				{headerMenu && <DesktopNavigation headerMenu={headerMenu} />}
				<CTAButton ctas={ctas || []} className="mr-4 hidden md:block" />
				<SideDrawer />
			</div>
		</div>
	);
};
