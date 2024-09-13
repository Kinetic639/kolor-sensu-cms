import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTAList";
import Img from "@/app/ui/Img";

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { onRight?: boolean };
}>) {
	return (
		<section className="section mx-auto grid max-w-screen-xl items-center gap-8 p-4 md:grid-cols-2 md:gap-x-12">
			<figure className={cn("max-md:full-bleed", image?.onRight && "md:order-1")}>
				<Img image={image} imageWidth={1200} />
			</figure>

			<div className="richtext mx-auto w-full max-w-lg [&_:is(h1,h2)]:text-balance">
				<span>{pretitle}</span>
				<PortableText value={content} />
				<CTAList ctas={ctas} className="!mt-4" />
			</div>
		</section>
	);
}
