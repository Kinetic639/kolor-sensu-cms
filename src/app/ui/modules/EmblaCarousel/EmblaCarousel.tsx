"use client";
import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { type EmblaOptionsType } from "embla-carousel";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import Img from "@/app/ui/Img";
import "./EmblaCarousel.css";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { cn } from "@/lib/utils";

type GalleryImage = {
	image: Sanity.Image;
	alt?: string;
	title: string;
	description: string;
};

type EmblaCarouselProps = {
	slides: GalleryImage[];
	options?: EmblaOptionsType;
	showCaptions: boolean;
	captionStyle: string;
	captionPosition: string;
	captionAlignment: "left" | "center" | "right"; // Add alignment type
};

const EmblaCarousel: React.FC<EmblaCarouselProps> = ({
	slides,
	options,
	showCaptions,
	captionStyle,
	captionPosition,
	captionAlignment, // New prop for alignment
}) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [canScrollPrev, setCanScrollPrev] = useState(false);
	const [canScrollNext, setCanScrollNext] = useState(false);
	const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
	const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
		containScroll: "keepSnaps",
		dragFree: true,
	});

	const scrollPrev = () => emblaMainApi && emblaMainApi.scrollPrev();
	const scrollNext = () => emblaMainApi && emblaMainApi.scrollNext();

	const onThumbClick = useCallback(
		(index: number) => {
			if (!emblaMainApi || !emblaThumbsApi) return;
			emblaMainApi.scrollTo(index);
		},
		[emblaMainApi, emblaThumbsApi],
	);

	const onSelect = useCallback(() => {
		if (!emblaMainApi || !emblaThumbsApi) return;
		setSelectedIndex(emblaMainApi.selectedScrollSnap());
		setCanScrollPrev(emblaMainApi.canScrollPrev());
		setCanScrollNext(emblaMainApi.canScrollNext());
		emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
	}, [emblaMainApi, emblaThumbsApi]);

	useEffect(() => {
		if (!emblaMainApi) return;
		onSelect();
		emblaMainApi.on("select", onSelect);
		emblaMainApi.on("reInit", onSelect);
	}, [emblaMainApi, onSelect]);

	const cleanedCaptionPosition = captionPosition
		.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();
	const cleanedCaptionAlignment = captionAlignment
		.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();
	const cleanedCaptionStyle = captionStyle
		.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();
	const captionAlignmentClass = `text-${cleanedCaptionAlignment}`;

	return (
		<div
			className={cn(
				"mx-auto w-full max-w-screen-xl gap-2 px-1 md:px-4",
				cleanedCaptionPosition === "top" && "flex-col-reverse",
				cleanedCaptionPosition === "left" && "flex-row-reverse",
				cleanedCaptionPosition === "right" && "flex",
			)}
		>
			<div className="embla">
				{/* Disable and hide prev button when cannot scroll */}
				<button
					onClick={scrollPrev}
					className={cn("embla__prev-button hidden", !canScrollPrev ? "md:hidden" : "md:block")}
					disabled={!canScrollPrev}
				>
					<GrLinkPrevious />
				</button>

				<div className="embla__viewport" ref={emblaMainRef}>
					<div className="embla__container relative">
						{slides.map((slide, index) => (
							<div className="embla__slide relative" key={index}>
								{showCaptions && cleanedCaptionStyle === "overlay" && (
									<div className={`caption-overlay ${captionAlignmentClass}`}>
										<Typography as="p" variant="body1" className="text-sm">
											{slide.title}
										</Typography>
										<Typography as="p" variant="caption" className="text-xs">
											{slide.description}
										</Typography>
									</div>
								)}

								<Img
									image={slide.image}
									alt={slide.alt || `Slide ${index + 1}`}
									imageWidth={1200}
								/>
							</div>
						))}
					</div>
				</div>

				{/* Disable and hide next button when cannot scroll */}
				<button
					onClick={scrollNext}
					className={cn("embla__next-button hidden", !canScrollNext ? "md:hidden" : "md:block")}
					disabled={!canScrollNext}
				>
					<GrLinkNext />
				</button>

				<div className="embla-thumbs">
					<div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
						<div className="embla-thumbs__container">
							{slides.map((slide, index) => (
								<div
									key={index}
									className={`embla-thumbs__slide ${index === selectedIndex ? "selected" : ""}`}
									onClick={() => onThumbClick(index)}
								>
									<Img
										image={slide.image}
										alt={slide.alt || `Thumb ${index + 1}`}
										imageWidth={150}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{showCaptions && cleanedCaptionStyle === "aside" && (
				<div className={`flex-1 border border-green-400`}>
					<h3 className={captionAlignmentClass}>{slides[selectedIndex].title}</h3>
					<p className={captionAlignmentClass}>{slides[selectedIndex].description}</p>
				</div>
			)}
		</div>
	);
};

export default EmblaCarousel;
