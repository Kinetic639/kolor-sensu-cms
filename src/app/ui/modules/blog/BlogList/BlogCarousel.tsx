"use client";

import { useEffect, useState } from "react";
import { categoryStore } from "../store";
import PostPreview from "../PostPreview";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export default function BlogCarousel({
	posts,
	predefinedFilters,
}: {
	posts: Sanity.BlogPost[];
	predefinedFilters?: Sanity.BlogCategory[];
} & React.HTMLAttributes<HTMLUListElement>) {
	const { selected } = categoryStore();
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);

	useEffect(() => {
		if (!api) return;

		// Update the current slide index whenever a new slide is selected
		const handleSelect = () => {
			setCurrent(api.selectedScrollSnap());
		};

		api.on("select", handleSelect);

		return () => {
			api.off("select", handleSelect);
		};
	}, [api]);

	const goToSlide = (index: number) => {
		api?.scrollTo(index);
		setCurrent(index); // Set the current state immediately when button is clicked
	};

	const isDesktop = useMediaQuery("(min-width: 768px)");
	if (isDesktop === undefined) {
		return null;
	}
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
			setApi={setApi} // Pass setApi to use the API
		>
			<CarouselContent>
				{filtered.map((post, index) => (
					<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
						<PostPreview post={post} />
					</CarouselItem>
				))}
			</CarouselContent>
			{isDesktop && (
				<>
					<CarouselPrevious />
					<CarouselNext />
				</>
			)}
			{/* Dot Indicators */}
			<div className="flex justify-center space-x-5 pt-6">
				{filtered.map((_, index) => (
					<button
						key={index}
						className={`flex h-6 w-6 items-center justify-center rounded-full ${
							index === current ? "md:border-3 border-[3px] border-foreground" : "bg-transparent"
						} relative`}
						aria-label={`Go to slide ${index + 1}`}
						onClick={() => goToSlide(index)}
					>
						<span
							className={`block h-3 w-3 rounded-full ${index === current ? "bg-foreground" : "bg-foreground"}`}
						></span>
					</button>
				))}
			</div>
		</Carousel>
	);
}
