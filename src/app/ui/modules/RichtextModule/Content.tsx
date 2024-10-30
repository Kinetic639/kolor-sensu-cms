import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";

export default function Content({
	value,
	className,
	children,
}: { value: Sanity.BlockContent } & React.HTMLProps<HTMLDivElement>) {
	return (
		<div
			className={cn(
				"mx-auto w-full space-y-[1em] border border-red-400 px-4 [&>:first-child]:!mt-0",
				className,
			)}
		>
			<PortableText value={value} components={customPortableTextComponents} />

			{children}
		</div>
	);
}
