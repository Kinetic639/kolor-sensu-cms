import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTAList";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function Banner({
	title,
	text,
	ctas,
	alignment = "center",
}: Partial<{
	title: string;
	text: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	alignment: "left" | "center" | "right";
	backgroundColor: string;
}>) {
	// Sanitize the alignment value to remove any non-printable characters
	const cleanedAlignment = alignment
		.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();
	return (
		<section
			className={cn(
				"mx-auto bg-background-secondary p-3 py-4 text-center text-foreground-secondary",
				cleanedAlignment === "left" && "text-left",
				cleanedAlignment === "right" && "text-right",
				cleanedAlignment === "center" && "text-center",
			)}
		>
			{title && (
				<Typography variant="h3" className={cn("mb-2 text-foreground-secondary")}>
					{title}
				</Typography>
			)}
			{text && <span>{text}</span>}
			{ctas && <CTAList ctas={ctas} className="mt-4" />}
		</section>
	);
}
