import { PortableText } from "@portabletext/react";
import Navigation from "./Navigation";
import { getSite } from "@/lib/sanity/getSite";
import Social from "@/app/ui/Social";
import Img from "@/app/ui/Img";

export default async function Footer() {
	const { title, copyright, footerDescription, footerMenu, social, logo } = await getSite();
	const logoImage = logo?.image?.dark || logo?.image?.default;
	return (
		<footer className="bg-gray-500 text-center text-foreground-secondary">
			<div className="py-3s mx-auto flex max-w-screen-xl justify-between">
				{logo && (
					<Img
						className="inline-block max-h-[2.2em] w-auto md:max-h-[2.6em]"
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

			<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-canvas/20 p-4 text-sm">
				&copy; {new Date().getFullYear()} {copyright ? <PortableText value={copyright} /> : title}{" "}
				{social && <Social social={social} />}
			</div>
		</footer>
	);
}
