import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTAList";
import Img from "@/app/ui/Img";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { EdgeBlob } from "@/app/ui/atoms/edge-blob/edge-blob";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	image,
	backgroundType,
}: Partial<{
	pretitle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { onRight?: boolean };
	backgroundType: string;
}>) {
	return (
		<section className={cn("relative", backgroundType === "solid" && "bg-background")}>
			{backgroundType === "blob" && <EdgeBlob />}
			<div
				className={
					"relative mx-auto grid max-w-screen-xl items-center gap-6 p-4 py-8 md:grid-cols-2 md:gap-x-12 md:py-16"
				}
			>
				<figure className={cn("max-md:full-bleed", image?.onRight && "md:order-1")}>
					<Img image={image} imageWidth={1200} />
				</figure>
				<div
					className={cn(
						"richtext mx-auto flex w-full max-w-lg flex-col [&_:is(h1,h2)]:text-balance",
						image?.onRight && "items-end text-right",
					)}
				>
					<Typography variant="h1" className="mb-4">
						{pretitle}
					</Typography>
					<PortableText value={content} components={customPortableTextComponents} />
					<CTAList ctas={ctas} className="mt-8" />
				</div>
			</div>
		</section>
	);
}
