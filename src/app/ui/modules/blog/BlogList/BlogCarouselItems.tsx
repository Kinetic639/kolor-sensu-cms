import React, { useEffect, useState, memo } from "react";
import Image from "next/image";

type TextItem = {
	text: string;
	icon?: { asset: { url: string }; alt?: string; loading?: "lazy" | "eager" };
};

const BlogCarouselItems = memo(({ textItems = [] }: { textItems: TextItem[] }) => {
	const [randomizedItems, setRandomizedItems] = useState<TextItem[]>([]);

	useEffect(() => {
		// Randomize the order of textItems
		setRandomizedItems([...textItems].sort(() => Math.random() - 0.5));
	}, [textItems]);

	return (
		<div className="relative hidden flex-wrap justify-center gap-8 bg-gradient-to-b from-[#A3B4AAFF] to-gray-200 p-6 py-12 md:flex md:gap-14 md:p-12 md:py-24">
			{randomizedItems.map((item, index) => {
				const randomMargin = Math.random() * (20 - -20) + -20;

				return (
					<div
						key={index}
						className="flex items-center justify-center rounded-md bg-gray-100 px-3 py-2 shadow-md md:px-4 md:py-3"
						style={{
							transform: `translateY(${randomMargin}px)`,
							border: "1px solid #D1D5DB",
						}}
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
			})}
		</div>
	);
});

BlogCarouselItems.displayName = "BlogCarouselItems";

export default BlogCarouselItems;
