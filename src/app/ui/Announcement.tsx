import { PortableText, groq } from "next-sanity";
import { fetchSanity } from "@/lib/sanity/fetch";
import { linkQuery } from "@/lib/sanity/queries";
import CTA from "@/app/ui/CTA";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default async function Announcement() {
	const announcements = await fetchSanity<Sanity.Announcement[]>(
		groq`*[_type == 'site'][0].announcements[]->{
      ...,
      cta{ ${linkQuery} },
    }`,
		{
			tags: ["announcements"],
			revalidate: 30,
		},
	);

	if (!announcements) return null;

	const active = announcements.find(({ start, end }) => {
		return (!start || new Date(start) < new Date()) && (!end || new Date(end) > new Date());
	});

	if (!active || !active.content) return null;

	return (
		<aside className="flex items-center justify-center gap-x-4 bg-foreground p-2 text-center text-foreground-secondary text-red-400 max-md:text-xs md:gap-x-6">
			<div className="anim-fade-to-r [&_a]:link text-foreground-secondary">
				{/* Use size="6px" for the desired text size */}
				<PortableText
					value={active.content} // Explicitly type content
					components={{
						...customPortableTextComponents,
						block: {
							normal: ({ children }) => (
								<Typography as="p" variant="body1" className="text-xs md:text-sm">
									{children}
								</Typography>
							),
						},
					}}
				/>
			</div>

			<CTA className="link anim-fade-to-l shrink-0" link={active.cta} />
		</aside>
	);
}
