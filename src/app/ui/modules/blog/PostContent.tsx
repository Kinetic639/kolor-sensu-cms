import Categories from "./Categories";
import ReadTime from "./ReadTime";
import css from "./PostContent.module.css";
import uid from "@/lib/uid";
import Content from "@/app/ui/modules/RichtextModule/Content";
import { cn } from "@/lib/utils";
import Date from "@/app/ui/Date";
import TableOfContents from "@/app/ui/modules/RichtextModule/TableOfContents";

export default function PostContent({
	post,
	...props
}: { post?: Sanity.BlogPost } & Sanity.Module) {
	if (!post) return null;

	const showTOC = !post.hideTableOfContents || !!post.headings?.length;

	return (
		<article id={uid(props)} className="mx-auto w-full max-w-screen-xl">
			<header className="section space-y-6 text-center">
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
					<Date value={post.publishDate} />
					<Categories className="flex flex-wrap gap-x-2" categories={post.categories} />
					<ReadTime value={post.readTime} />
				</div>
				<h1 className="h1 text-balance">{post.metadata.title}</h1>
			</header>
			<div
				className={cn(
					"section grid gap-8 border border-red-400",
					showTOC && "lg:grid-cols-[1fr,auto]",
				)}
			>
				{showTOC && (
					<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-[250px]">
						<TableOfContents headings={post.headings} />
					</aside>
				)}
				<Content value={post.body} className={cn("grid w-full")}>
					<hr />
				</Content>
			</div>
		</article>
	);
}
