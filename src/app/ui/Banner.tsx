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
				"mx-auto bg-background-secondary p-3 py-6 text-center text-foreground-secondary",
				cleanedAlignment === "left" && "text-left",
				cleanedAlignment === "right" && "text-right",
				cleanedAlignment === "center" && "text-center",
			)}
		>
			{title && (
				<Typography
					variant="h3"
					className={cn("mx-auto mb-3 w-full max-w-screen-xl px-4 text-foreground-secondary")}
				>
					{title}
				</Typography>
			)}
			{text && (
				<Typography
					as="p"
					variant="body1"
					className="mx-auto w-full max-w-screen-xl px-4 text-foreground-secondary"
				>
					{text}
				</Typography>
			)}
			{ctas && <CTAList ctas={ctas} className="mt-4" />}
		</section>
	);
}
