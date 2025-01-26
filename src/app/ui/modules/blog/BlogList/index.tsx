import { PortableText } from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";
import List from "./List";
import { fetchSanity, groq } from "@/lib/sanity/fetch";
import { cn } from "@/lib/utils";
import Filtering from "@/app/ui/modules/blog/BlogList/Filtering";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import BlogCarousel from "@/app/ui/modules/blog/BlogList/BlogCarousel";

export default async function BlogList({
	intro,
	layout,
	limit = 100,
	displayFilters,
	predefinedFilters,
	textItems,
}: Partial<{
	intro: Sanity.BlockContent;
	layout: "grid" | "carousel";
	limit: number;
	displayFilters: boolean;
	predefinedFilters: Sanity.BlogCategory[];
	textItems: Array<{ text: string; icon?: { asset: { url: string }; alt?: string } }>;
}>) {
	const posts = await fetchSanity<Sanity.BlogPost[]>(
		groq`*[_type == 'blog.post']|order(featured desc, publishDate desc)[0...$limit]{
			...,
			categories[]->,
			author->{
firstName,
lastName,
      avatar{
        asset->{
          _id,
          url
        },
        alt
      }
}
		}`,
		{
			params: { limit },
			tags: ["posts"],
		},
	);
	return (
		<section
			className={cn(
				"section mx-1 max-w-screen-xl space-y-8 rounded-3xl py-6 md:mx-auto",
				stegaClean(layout) === "carousel" && "max-w-none",
			)}
		>
			{intro && (
				<header className="text-center text-xs">
					<PortableText value={intro} components={customPortableTextComponents} />
				</header>
			)}

			{displayFilters && <Filtering predefinedFilters={predefinedFilters} />}

			{stegaClean(layout) === "carousel" ? (
				<BlogCarousel
					textItems={textItems}
					posts={posts}
					predefinedFilters={predefinedFilters}
					className={cn(
						"gap-x-8 gap-y-12",
						"carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4",
					)}
				/>
			) : (
				<List
					posts={posts}
					predefinedFilters={predefinedFilters}
					layout={stegaClean(layout)}
					className={cn(
						"gap-x-6 gap-y-12",
						stegaClean(layout) === "grid"
							? "grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
							: "carousel max-xl:full-bleed md:overflow-fade-r pb-4 [--size:320px] max-xl:px-4",
					)}
				/>
			)}
		</section>
	);
}
