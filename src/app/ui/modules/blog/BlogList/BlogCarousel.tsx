"use client";

import React, { useMemo } from "react";
import { categoryStore } from "../store";
import PostPreview from "../PostPreview";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import BlogCarouselItems from "@/app/ui/modules/blog/BlogList/BlogCarouselItems";

type TextItem = {
	text: string;
	icon?: {
		asset: { url: string };
		alt?: string;
	};
};

export default function BlogCarousel({
	posts,
	predefinedFilters,
	textItems,
}: {
	posts: Sanity.BlogPost[];
	predefinedFilters?: Sanity.BlogCategory[];
	textItems?: TextItem[];
} & React.HTMLAttributes<HTMLUListElement>) {
	const { selected } = categoryStore();

	// Memoize the filtered posts to prevent recalculation on every render
	const filtered = useMemo(
		() =>
			posts
				.filter(
					(post) =>
						!predefinedFilters?.length ||
						post.categories?.some((category) =>
							predefinedFilters.some((filter) => filter._id === category._id),
						),
				)
				.filter(
					(post) =>
						selected === "All" || post.categories?.some((category) => category._id === selected),
				),
		[posts, predefinedFilters, selected],
	);

	const isDesktop = useMediaQuery("(min-width: 768px)");
	if (isDesktop === undefined) {
		return null;
	}

	if (!filtered.length) {
		return <div>No posts found...</div>;
	}

	return (
		<section className="relative flex flex-col">
			{/* Memoized BlogCarouselItems will now only re-render when textItems change */}
			<BlogCarouselItems textItems={textItems || []} />

			{/* Second Div with Solid Gray Background */}
			<div className="bg-gray-200 px-4 pb-12 pt-6 lg:px-0">
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="mx-auto flex w-full max-w-screen-xl flex-col py-4 md:flex-row"
				>
					{/* Side Description replacing previous/next buttons */}

					<div className="mb-8 mr-4 w-full max-w-[400px] pr-8">
						<Typography variant="h2" as="h3">
							Newsy
						</Typography>
						<Typography variant="body1" color="default" className="mt-4">
							Bądź na bieżąco z nowymi wpisami i aktualnościami dotyczącymi naszych wydarzeń.
						</Typography>
						<Typography
							variant="body2"
							className="mt-4 inline-block text-green-700 hover:underline"
						>
							<a href="#">Dołącz do naszej społeczności i rozwijaj się razem z nami!</a>
						</Typography>
						<div className="mt-6 hidden justify-end gap-4 md:flex">
							<CarouselPrevious />
							<CarouselNext />
						</div>
					</div>

					<CarouselContent>
						{filtered.map((post, index) => (
							<CarouselItem key={index} className="md:basis-1/2">
								<PostPreview post={post} />
							</CarouselItem>
						))}
					</CarouselContent>
					{/* Dot Indicators */}
					{!isDesktop && (
						<div className="mt-6 flex justify-end gap-4 md:hidden">
							<CarouselPrevious />
							<CarouselNext />
						</div>
					)}
				</Carousel>
			</div>
		</section>
	);
}
