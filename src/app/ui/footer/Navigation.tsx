import { PortableText } from "@portabletext/react";
import CTA from "@/app/ui/CTA";
import { getSite } from "@/lib/sanity/getSite";
import LinkList from "@/app/ui/LinkList";
import Social from "@/app/ui/Social";

export default async function Menu() {
	const { footerMenu, footerDescription } = await getSite();
	return (
		<nav className="flex w-full flex-wrap justify-center gap-x-12 gap-y-6">
			{footerDescription && (
				<div className="flex flex-col flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
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
								<LinkList {...item} />
							</div>
						);

					default:
						return null;
				}
			})}
			<div className="text-sms flex flex-col items-center gap-2">
				<span className="text-sm font-bold">Social Media</span>
				<Social />
			</div>
		</nav>
	);
}
