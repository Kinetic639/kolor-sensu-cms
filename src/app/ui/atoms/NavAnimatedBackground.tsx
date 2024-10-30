"use client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

export const NavAnimatedBackground = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 0);
		};

		handleScroll(); // Initial check
		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	if (isDesktop === undefined) {
		return null;
	}

	return (
		<motion.span
			initial={{
				width: isScrolled ? "100%" : isDesktop ? "60px" : "60px",
				borderRadius: isScrolled ? "0 0 25px 25px" : 0,
				left: 0,
			}}
			animate={{
				width: isScrolled ? "100%" : isDesktop ? "60px" : "60px",
				borderRadius: isScrolled
					? isDesktop
						? "0 0 25px 25px"
						: 0
					: isDesktop
						? "0 0 25px 25px"
						: "0 0 25px 25px",
				left: 0,
			}}
			transition={{
				width: {
					duration: 0.6, // Increased duration for a smoother effect
					delay: isScrolled ? 0.1 : 0,
					ease: [0.25, 0.8, 0.5, 1], // Custom cubic-bezier easing for organic movement
				},
				borderRadius: { duration: 0.2, delay: !isScrolled ? 0.22 : 0 },
			}}
			className={cn(
				"absolute left-0 top-0 z-[-1] hidden h-full rounded-b-full bg-[#7ea57a] md:block",
			)}
		></motion.span>
	);
};
