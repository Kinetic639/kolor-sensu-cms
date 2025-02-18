"use client";

import { useEffect } from "react";
import { categoryStore } from "../store";
import PostPreview from "../PostPreview";
import { cn } from "@/lib/utils";

export default function List({
	posts,
	predefinedFilters,
	layout,
	...props
}: {
	posts: Sanity.BlogPost[];
	layout?: "grid" | "carousel";
	predefinedFilters?: Sanity.BlogCategory[];
} & React.HTMLAttributes<HTMLUListElement>) {
	const { selected, reset } = categoryStore();

	useEffect(reset, [reset]);

	const filtered = posts
		.filter(
			(post) =>
				!predefinedFilters?.length ||
				post.categories?.some((category) =>
					predefinedFilters.some((filter) => filter._id === category._id),
				),
		)
		.filter(
			(post) =>
				selected === "All" || post.categories?.some((category) => category._id === selected),
		);

	if (!filtered.length) {
		return <div>No posts found...</div>;
	}

	return (
		<ul
			{...props}
			className={cn("mx-auto flex w-full flex-col gap-8", layout === "grid" && "px-2 md:px-8")}
		>
			{filtered?.map((post) => (
				<li className="anim-fade" key={post._id}>
					<PostPreview post={post} layout={layout} />
				</li>
			))}
		</ul>
	);
}
