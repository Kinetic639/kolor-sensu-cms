import { PortableText } from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";
import List from "./List";
import { fetchSanity, groq } from "@/lib/sanity/fetch";
import { cn } from "@/lib/utils";
import Filtering from "@/app/ui/modules/blog/BlogList/Filtering";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";

export default async function BlogList({
	intro,
	layout,
	limit = 100,
	displayFilters,
	predefinedFilters,
}: Partial<{
	intro: Sanity.BlockContent;
	layout: "grid" | "carousel";
	limit: number;
	displayFilters: boolean;
	predefinedFilters: Sanity.BlogCategory[];
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post']|order(featured desc, publishDate desc)[0...$limit]{
			...,
			categories[]->
		}`,
		{
			params: { limit },
			tags: ["posts"],
		},
	);

	return (
		<section className="section space-y-8">
			{intro && (
				<header className="richtext">
					<PortableText value={intro} components={customPortableTextComponents} />
				</header>
			)}

			{displayFilters && <Filtering predefinedFilters={predefinedFilters} />}

			<List
				posts={posts}
				predefinedFilters={predefinedFilters}
				className={cn(
					"gap-x-6 gap-y-12",
					stegaClean(layout) === "grid"
						? "grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
						: "carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4",
				)}
			/>
		</section>
	);
}
