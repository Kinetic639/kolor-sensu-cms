import React, { useEffect, useState, memo } from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

type TextItem = {
	text: string;
	icon?: { asset: { url: string }; alt?: string; loading?: "lazy" | "eager" };
};

const BlogCarouselItems = memo(({ textItems = [] }: { textItems: TextItem[] }) => {
	const [randomizedItems, setRandomizedItems] = useState<TextItem[]>([]);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	useEffect(() => {
		// Randomize the order of textItems
		setRandomizedItems([...textItems].sort(() => Math.random() - 0.5));
	}, [textItems]);

	if (isDesktop === undefined) {
		return null;
	}

	const ItemContent = ({
		item,
		index,
		withMargin = false,
	}: {
		item: TextItem;
		index: number;
		withMargin?: boolean;
	}) => (
		<div
			key={index}
			className="flex items-center justify-center rounded-md bg-gray-100 px-3 py-2 shadow-md md:px-4 md:py-3"
			style={
				withMargin
					? {
							transform: `translateY(${Math.random() * (20 - -20) + -20}px)`,
							border: "1px solid #D1D5DB",
						}
					: {
							border: "1px solid #D1D5DB",
						}
			}
		>
			{item.icon && (
				<Image
					src={item.icon.asset.url}
					alt={item.icon.alt || ""}
					width={24}
					height={24}
					className="mr-2 h-5 w-5 md:h-6 md:w-6"
					loading={item.icon.loading || "lazy"}
				/>
			)}
			<span className="text-sm font-medium text-[#64876E] md:text-base">{item.text}</span>
		</div>
	);

	return (
		<div className="relative bg-gradient-to-b from-[#A3B4AAFF] to-gray-200 px-6 pt-12 md:p-12 md:py-24">
			{isDesktop ? (
				<div className="flex flex-wrap justify-center gap-0 md:gap-14">
					{randomizedItems.map((item, index) => (
						<ItemContent key={index} item={item} index={index} withMargin={true} />
					))}
				</div>
			) : (
				<Marquee speed={40}>
					{randomizedItems.map((item, index) => (
						<div key={index} className="mx-4">
							<ItemContent item={item} index={index} />
						</div>
					))}
				</Marquee>
			)}
		</div>
	);
});

BlogCarouselItems.displayName = "BlogCarouselItems";

export default BlogCarouselItems;
