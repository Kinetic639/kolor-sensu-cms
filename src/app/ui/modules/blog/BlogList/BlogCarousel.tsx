"use client";

import { useEffect } from "react";
import { categoryStore } from "../store";
import PostPreview from "../PostPreview";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function BlogCarousel({
	posts,
	predefinedFilters,
}: {
	posts: Sanity.BlogPost[];
	predefinedFilters?: Sanity.BlogCategory[];
} & React.HTMLAttributes<HTMLUListElement>) {
	const { selected, reset } = categoryStore();

	useEffect(reset, [reset]);

	const filtered = posts
		// filter by predefined filters
		.filter(
			(post) =>
				!predefinedFilters?.length ||
				post.categories?.some((category) =>
					predefinedFilters.some((filter) => filter._id === category._id),
				),
		)
		// filter by selected category
		.filter(
			(post) =>
				selected === "All" || post.categories?.some((category) => category._id === selected),
		);

	if (!filtered.length) {
		return <div>No posts found...</div>;
	}

	return (
		<Carousel
			opts={{
				align: "start",
				loop: true,
			}}
			className="mx-auto w-full max-w-screen-xl"
		>
			<CarouselContent>
				{filtered?.map((post, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
						<PostPreview post={post} />
					</CarouselItem>
				))}
			</CarouselContent>
		</Carousel>
	);
}
