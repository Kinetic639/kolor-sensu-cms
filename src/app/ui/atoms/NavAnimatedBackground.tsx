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
		<span
			className={cn(
				"absolute left-0 top-0 z-[-1] hidden h-full w-full",
				"transition-colors duration-300",
				isScrolled ? "bg-gray-400" : "bg-transparent",
				"md:block",
			)}
		></span>
	);
};
