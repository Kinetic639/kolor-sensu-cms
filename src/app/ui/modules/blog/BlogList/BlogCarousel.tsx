"use client";

import React, { useEffect, useState } from "react";
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
import BlogCarouselItems from "@/app/ui/modules/blog/BlogList/BlogCarouselItems";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

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
	textItems: TextItem[];
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
		<section className="relative flex flex-col">
			{/* First Div with Gradient Background */}
			<BlogCarouselItems textItems={textItems || []} />

			{/* Second Div with Solid Gray Background */}
			<div className="bg-gray-200 px-4 pb-12 pt-6 lg:px-0">
				<Carousel
					opts={{
						align: "start",
						loop: true,
					}}
					className="mx-auto flex w-full max-w-screen-xl flex-col md:flex-row"
					setApi={setApi}
				>
					{/* Side Description replacing previous/next buttons */}
					{isDesktop && (
						<div className="mb-8 max-w-[300px] pr-8">
							<Typography variant="h2" color="default">
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
							<div className="mt-6 flex justify-end gap-4">
								<CarouselPrevious />
								<CarouselNext />
							</div>
						</div>
					)}
					<CarouselContent>
						{filtered.map((post, index) => (
							<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
								<PostPreview post={post} />
							</CarouselItem>
						))}
					</CarouselContent>
					{/* Dot Indicators */}
					{!isDesktop && (
						<div className="flex items-center justify-center px-4 pt-6">
							<CarouselPrevious />
							<div className="mx-12 flex justify-center space-x-5">
								{filtered.map((_, index) => (
									<button
										key={index}
										className={`flex h-6 w-6 items-center justify-center rounded-full ${
											index === current
												? "md:border-3 border-[3px] border-foreground"
												: "bg-transparent"
										} relative`}
										aria-label={`Go to slide ${index + 1}`}
										onClick={() => goToSlide(index)}
									>
										<span
											className={`block h-3 w-3 rounded-full ${
												index === current ? "bg-foreground" : "bg-foreground"
											}`}
										></span>
									</button>
								))}
							</div>
							<CarouselNext />
						</div>
					)}
				</Carousel>
			</div>
		</section>
	);
}
