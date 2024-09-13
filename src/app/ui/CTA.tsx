import Link from "next/link";
import { stegaClean } from "@sanity/client/stega";
import processUrl from "@/lib/processUrl";
import { cn } from "@/lib/utils";

export default function CTA({
	link,
	style,
	className,
	children,
	...rest
}: Sanity.CTA & React.HTMLAttributes<HTMLAnchorElement>) {
	const props = {
		className: cn(style, className) || undefined,
		children: children || link?.label || link?.internal?.title || link?.external,
		...rest,
	};

	if (link?.type === "internal" && link.internal)
		return (
			<Link
				href={processUrl(link.internal, {
					base: false,
					params: link.params,
				})}
				{...props}
			/>
		);

	if (link?.type === "external" && link.external)
		return <a target="_blank" href={stegaClean(link.external)} {...props} />;

	return props.children;
}
