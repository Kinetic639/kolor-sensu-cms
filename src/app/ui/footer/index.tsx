import { PortableText } from "@portabletext/react";
import Navigation from "./Navigation";
import { getSite } from "@/lib/sanity/getSite";
import Social from "@/app/ui/Social";
import Img from "@/app/ui/Img";

export default async function Footer() {
	const { title, copyright, footerDescription, footerMenu, social, logo } = await getSite();
	const logoImage = logo?.image?.dark || logo?.image?.default;
	return (
		<footer className="bg-[rgb(185,201,190)] text-center text-foreground">
			<div className="mx-auto flex max-w-screen-xl justify-between px-4 py-6 max-md:flex-col max-md:items-center max-md:gap-y-4">
				{logo && (
					<Img
						className="h-auto w-full max-w-[60px] object-contain"
						image={logoImage}
						alt={logoImage?.alt || ""}
					/>
				)}
				<Navigation
					logo={logoImage}
					footerMenu={footerMenu}
					footerDescription={footerDescription}
				/>
			</div>
			<div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/60 p-4 text-sm max-sm:flex-col-reverse max-sm:gap-y-4">
				{copyright ? <PortableText value={copyright} /> : title}{" "}
				<span className="flex items-center gap-x-2">
					&copy; {new Date().getFullYear()} {"Kolor Sensu "}
					{social && <Social social={social} />}
				</span>
			</div>
		</footer>
	);
}
