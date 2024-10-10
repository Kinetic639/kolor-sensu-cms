import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";

export default function Content({
	value,
	className,
	children,
}: { value: Sanity.BlockContent } & React.HTMLProps<HTMLDivElement>) {
	return (
		<div className={cn("richtext mx-auto w-full space-y-[1em] [&>:first-child]:!mt-0", className)}>
			<PortableText value={value} components={customPortableTextComponents} />

			{children}
		</div>
	);
}
