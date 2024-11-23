import uid from "@/lib/uid";
import Content from "@/app/ui/modules/RichtextModule/Content";
import { cn } from "@/lib/utils";
import TableOfContents from "@/app/ui/modules/RichtextModule/TableOfContents";
import BlogPostHeader from "@/app/ui/modules/blog/BlogPostHeader";

export default function PostContent({
	post,
	...props
}: { post?: Sanity.BlogPost } & Sanity.Module) {
	if (!post) return null;

	const showTOC = !post.hideTableOfContents || !!post.headings?.length;

	return (
		<article id={uid(props)} className="mx-auto w-full max-w-screen-xl">
			<BlogPostHeader post={post} />
			<div className={cn("section grid gap-8", showTOC && "lg:grid-cols-[1fr,auto]")}>
				{showTOC && (
					<aside className="lg:sticky-below-header mx-auto w-full max-w-lg self-start [--offset:1rem] lg:order-1 lg:w-[250px]">
						<TableOfContents headings={post.headings} />
					</aside>
				)}
				<Content value={post.body} className={cn("w-full")}>
					<hr />
				</Content>
			</div>
		</article>
	);
}
