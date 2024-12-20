import { PortableText } from "@portabletext/react";
import Navigation from "./Navigation";
import { getSite } from "@/lib/sanity/getSite";

export default async function Footer() {
	const { title, copyright, footerDescription, footerMenu, social } = await getSite();

	return (
		<footer className="bg-gray-500 text-center text-foreground-secondary">
			<div className="section border-b border-canvas/20">
				<div className="mx-auto flex w-full max-w-screen-xl justify-center gap-6 p-4">
					<Navigation
						footerMenu={footerMenu}
						footerDescription={footerDescription}
						social={social}
					/>
				</div>
			</div>

			<div className="flex flex-wrap justify-center gap-x-6 gap-y-2 p-4 text-sm">
				&copy; {new Date().getFullYear()} {copyright ? <PortableText value={copyright} /> : title}
			</div>
		</footer>
	);
}
