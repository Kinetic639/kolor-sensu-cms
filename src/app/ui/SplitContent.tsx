"use client";
import React from "react";
import { motion } from "framer-motion";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function SplitContent({
	heading,
	subheading,
	items,
	image,
	backgroundType = "wavy",
	backgroundImage,
	backgroundOverlap = false,
}: Partial<{
	heading: string;
	subheading: string;
	items: { icon: Sanity.Image; text: string }[];
	image: Sanity.Image & { alt?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
	backgroundOverlap: boolean;
}>) {
	return <div></div>;
}
