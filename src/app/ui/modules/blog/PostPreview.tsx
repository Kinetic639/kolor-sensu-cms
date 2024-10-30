import Link from "next/link";
import React from "react";
import { ArrowRight } from "lucide-react";
import Categories from "./Categories";
import processUrl from "@/lib/processUrl";
import Img from "@/app/ui/Img";
import Date from "@/app/ui/Date";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function PostPreview({ post }: { post: Sanity.BlogPost }) {
	const authorName = `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim();

	return (
		<Link className="group block cursor-pointer space-y-2" href={processUrl(post, { base: false })}>
			<figure className="relative aspect-video overflow-hidden bg-ink/5">
				<Img
					className="aspect-video w-full object-cover transition-[filter,transform] group-hover:scale-105 group-hover:brightness-110"
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
			<div className="min-h-52 py-2 transition-colors duration-100">
				<div className="flex flex-wrap gap-x-4 pb-1 pt-2 text-xs transition-colors duration-100">
					<Date value={post.publishDate} />
				</div>
				<Typography
					as="h5"
					variant="h6"
					className="pb-1 transition-colors duration-100 group-hover:text-foreground-hover"
				>
					{post.metadata.title}
				</Typography>
				<Typography as="h5" variant="body2" className="transition-colors duration-100">
					{post.metadata.description}
				</Typography>
				<div className="mt-4 inline-flex w-full items-center justify-end px-4 text-sm font-medium transition-transform duration-100 group-hover:text-foreground-hover">
					<span>Więcej</span>
					<span
						className="ml-1 inline-block translate-x-0 transform text-xs transition-transform duration-100 group-hover:translate-x-1"
						aria-hidden="true"
					>
						<ArrowRight size={18} />
					</span>
				</div>
			</div>
			{post.author && (
				<div className="mt-8 flex items-center space-x-3 transition-colors duration-100">
					{post.author.avatar && (
						<Img
							className="aspect-square h-8 w-8 rounded-full object-cover"
							image={post.author.avatar}
							imageWidth={800}
							alt={authorName}
						/>
					)}
					<span className="text-xs font-medium">{authorName}</span>
				</div>
			)}
			<div className="flex flex-wrap gap-x-4 border-t border-[#223B4A24] py-2 text-sm transition-colors duration-100">
				<Categories className="flex flex-wrap gap-x-2 text-xs" categories={post.categories} />
			</div>
		</Link>
	);
}
