import React from "react";
import Categories from "./Categories";
import Img from "@/app/ui/Img";
import Date from "@/app/ui/Date";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import ReadTime from "@/app/ui/modules/blog/ReadTime";
import { BlogBreadcrumb } from "@/app/ui/modules/blog/BlogBreadcrumb";

export default function BlogPostHeader({ post }: { post: Sanity.BlogPost }) {
	const authorName = `${post.author?.firstName || ""} ${post.author?.lastName || ""}`.trim();
	const hasImage = Boolean(post.metadata?.image);
	console.log("author", authorName);
	return (
		<header className="mx-auto mb-10 max-w-screen-xl px-4 pb-10 pt-6 md:pt-10">
			<BlogBreadcrumb title={post.metadata.title} />

			{/* Title */}
			<Typography as="h1" variant="h2" className="my-4 text-[40px] font-semibold leading-none">
				{post.metadata.title}
			</Typography>

			{/* Two-Column Layout */}
			<div className="flex flex-col gap-6 md:flex-row">
				{/* Left Column: Image */}
				{hasImage && (
					<div className="h-auto w-full md:w-1/2">
						<Img
							className="h-full w-full rounded-md object-cover shadow-lg"
							image={post.metadata.image}
							imageWidth={600}
							alt={post.metadata.title || "Post Image"}
						/>
					</div>
				)}

				{/* Right Column: Description, Author, Categories */}
				<div className="flex w-full flex-col justify-between md:w-1/2">
					{/* Description */}
					<Typography as="p" variant="body1" className="mb-4 text-lg text-gray-700">
						{post.metadata.description}
					</Typography>

					{/* Author and Categories */}
					<div className="mt-auto text-sm text-gray-600">
						{post.author && (
							<div className="mt-2 flex items-center gap-2 space-x-2 border-b border-[#223B4A24] pb-2 pt-2 transition-colors duration-100">
								{post.author.avatar && (
									<Img
										className="aspect-square h-10 w-10 rounded-full object-cover"
										image={post.author.avatar}
										imageWidth={800}
										alt={authorName}
									/>
								)}
								<div>
									<div className="flex flex-col justify-between gap-1 text-xs text-gray-500">
										<span className="text-base font-semibold">{authorName}</span>
										<div className="flex gap-6">
											<Date value={post.publishDate} />
											<ReadTime value={post.readTime} />
										</div>
									</div>
								</div>
							</div>
						)}

						<Categories className="flex flex-wrap gap-2 pt-1" categories={post.categories} />
					</div>
				</div>
			</div>
		</header>
	);
}
