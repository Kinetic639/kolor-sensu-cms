import CTA from "./CTA";
import { cn } from "@/lib/utils";

export default function CTAList({
	ctas,
	onRight,
	className,
}: React.HTMLAttributes<HTMLDivElement> & { onRight?: boolean | undefined; ctas?: Sanity.CTA[] }) {
	if (!ctas?.length) return null;

	return (
		<div
			className={cn(
				"flex flex-wrap items-center gap-[.5em]",
				onRight && "justify-center",
				className,
			)}
		>
			{ctas?.map((cta, key) => <CTA {...cta} key={key} />)}
		</div>
	);
}
