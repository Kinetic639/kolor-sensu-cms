"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Undo } from "lucide-react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import client from "@/lib/sanity/client";

interface FlipCardContent {
	title: string;
	image: Sanity.Image;
	frontText: string;
	hoverText?: string;
	faqList?: Sanity.FAQList;
}

export const FlipCard = ({ title, image, frontText, hoverText }: FlipCardContent) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const flipBackTimeout = useRef<NodeJS.Timeout | null>(null);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const { src } = useNextSanityImage(client, image);
	const variants = {
		front: {
			rotateY: 0,
			zIndex: 1,
		},
		back: {
			rotateY: 180,
			zIndex: 0,
		},
	};

	const handleToggleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	const handleEnter = () => {
		if (flipBackTimeout.current) {
			clearTimeout(flipBackTimeout.current);
			flipBackTimeout.current = null;
		}
		setIsFlipped(true);
	};

	const handleLeave = () => {
		flipBackTimeout.current = setTimeout(() => {
			setIsFlipped(false);
		}, 150);
	};

	useEffect(() => {
		return () => {
			if (flipBackTimeout.current) {
				clearTimeout(flipBackTimeout.current);
			}
		};
	}, []);

	return (
		<div className="perspective-1000 h-full min-h-[450px] w-full min-w-[300px] max-w-[340px] cursor-pointer">
			<motion.div
				className="flip-card-inner relative h-[100%] w-full"
				variants={variants}
				initial="front"
				animate={isFlipped ? "back" : "front"}
				transition={{ duration: 0.3, ease: "easeInOut" }}
				style={{ transformStyle: "preserve-3d" }}
				onClick={!isDesktop ? handleToggleFlip : undefined}
				onMouseEnter={handleEnter}
				onMouseLeave={handleLeave}
			>
				<motion.div
					className="flip-card-front absolute left-0 top-0 h-[100%] w-full"
					style={{ backfaceVisibility: "hidden" }}
				>
					<Card className="bent-corner relative h-full bg-background px-6 py-8">
						{image?.asset && (
							<Image src={src} alt={image.alt || ""} height={140} width={140} className="mx-auto" />
						)}
						<CardHeader>
							<CardTitle className="leading-2 text-foreground">{title}</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-foreground">{frontText}</p>
						</CardContent>
						<CardFooter className="absolute bottom-2 right-2 text-xs italic text-gray-500">
							<Undo />
						</CardFooter>
					</Card>
				</motion.div>

				<motion.div
					className="flip-card-back rotate-y-180 absolute left-0 top-0 h-[100%] w-full"
					style={{ backfaceVisibility: "hidden" }}
				>
					<Card className="h-[100%] bg-foreground text-background">
						<CardContent className="p-10 text-center">
							<p>{hoverText}</p>
						</CardContent>
					</Card>
				</motion.div>
			</motion.div>
		</div>
	);
};
