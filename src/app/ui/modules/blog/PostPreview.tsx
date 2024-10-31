import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import Categories from "./Categories";
import processUrl from "@/lib/processUrl";
import Img from "@/app/ui/Img";
import Date from "@/app/ui/Date";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { cn } from "@/lib/utils";

export default function PostPreview({
	post,
	layout,
}: {
	post: Sanity.BlogPost;
	layout?: "grid" | "carousel";
}) {
	const authorName = `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim();
	console.log(layout);
	return (
		<Link
			className={cn(
				"group cursor-pointer space-y-2",
				layout === "grid"
					? "rounded-lg p-2 transition-shadow duration-150 hover:bg-[#F5EEEAFF] hover:shadow-lg md:flex md:gap-4" // Reduced padding for grid layout
					: "block",
			)}
			href={processUrl(post, { base: false })}
		>
			<figure
				className={cn(
					"relative overflow-hidden bg-ink/5",
					layout === "grid" ? "h-full md:w-1/3" : "aspect-w-16 aspect-h-9",
				)}
			>
				<Img
					className="h-full w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
					image={post.metadata.image}
					imageWidth={800}
					alt={post.metadata.title}
				/>

				{post.featured && (
					<span className="action absolute right-4 top-0 rounded-t-none bg-gray-100 bg-opacity-90 px-2 py-1 text-xs shadow-md">
						Promowany
					</span>
				)}
			</figure>

			<div className={cn("flex flex-1 flex-col", layout === "grid" ? "my-0 mt-0" : "")}>
				<div className="flex flex-1 flex-col transition-colors duration-100">
					<div className="flex flex-wrap gap-x-4 pb-1 pt-1 text-xs transition-colors duration-100">
						<Date value={post.publishDate} />
					</div>
					<div className="flex flex-wrap gap-x-4 border-t border-[#223B4A24] py-2 text-xs transition-colors duration-100">
						<Categories className="flex flex-wrap gap-x-2 text-xs" categories={post.categories} />
					</div>
					<Typography
						as="h5"
						variant="h6"
						className="pb-1 text-base transition-colors duration-100 group-hover:text-foreground-hover" // Adjusted font size for compact look
					>
						{post.metadata.title}
					</Typography>
					<Typography
						as="h5"
						variant="body2"
						className={cn(
							"text-sm transition-colors duration-100",
							layout !== "grid" && "min-h-24",
							layout === "grid" && "pb-6 md:min-h-0", // Adjusted height for grid layout
						)}
					>
						{post.metadata.description}
					</Typography>
					<div className="inline-flex w-full items-center justify-end px-4 py-2 text-xs font-medium transition-transform duration-100 group-hover:text-foreground-hover">
						<span>Więcej</span>
						<span
							className="ml-1 inline-block translate-x-0 transform text-xs transition-transform duration-100 group-hover:translate-x-1"
							aria-hidden="true"
						>
							<ArrowRight size={16} />
						</span>
					</div>
				</div>
				{post.author && (
					<div className="mt-2 flex items-center space-x-2 border-t border-[#223B4A24] pb-2 pt-2 transition-colors duration-100">
						{post.author.avatar && (
							<Img
								className="aspect-square h-6 w-6 rounded-full object-cover"
								image={post.author.avatar}
								imageWidth={800}
								alt={authorName}
							/>
						)}
						<span className="text-xs font-medium">{authorName}</span>
					</div>
				)}
			</div>
		</Link>
	);
}
