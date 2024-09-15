import React from "react";
import { RiMenu3Fill } from "react-icons/ri";
import Link from "next/link";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
	SheetHeader,
	SheetClose,
} from "@/components/ui/sheet";
import { SidebarMenuDrawer } from "@/app/ui/SidebarMenuDrawer";
import { getSite } from "@/lib/sanity/getSite";
import { cn } from "@/lib/utils";
import Img from "@/app/ui/Img";

export const SideDrawer = async () => {
	const { headerMenu, logo, ctas } = await getSite();
	const logoImage = logo?.image?.dark || logo?.image?.default;
	return (
		<Sheet>
			<SheetTrigger asChild className="min-w-14 text-2xl text-foreground-secondary md:hidden">
				<RiMenu3Fill />
			</SheetTrigger>
			<SheetContent className="min-w-[300px]">
				<SheetHeader className="flex-row items-start justify-between">
					<SheetTitle className="sr-only">sidebar menu</SheetTitle>
					<SheetDescription className="sr-only">mobile side menu</SheetDescription>
					<div>
						<Link className={cn("h2 inline-block", logo?.image && "max-w-[250px]")} href="/">
							{logoImage && (
								<Img
									className="inline-block max-h-[2em] w-auto"
									image={logoImage}
									alt={logo?.name || ""}
								/>
							)}
						</Link>
					</div>
					<SheetClose>
						<Cross2Icon className="h-6 w-6" />
					</SheetClose>
				</SheetHeader>
				{headerMenu && ctas && logo && <SidebarMenuDrawer headerMenu={headerMenu} ctas={ctas} />}
			</SheetContent>
		</Sheet>
	);
};
