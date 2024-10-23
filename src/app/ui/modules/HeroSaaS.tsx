import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img from "@/app/ui/Img";

export default function HeroSaaS({
	pretitle,
	content,
	ctas,
	image,
}: Partial<{
	pretitle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & {
		faded?: boolean;
	};
}>) {
	return (
		<section className="section space-y-8 text-center">
			<div className="richtext mx-auto max-w-2xl text-balance">
				<span>{pretitle}</span>
				<PortableText value={content} />
				<CTAList ctas={ctas} className="!mt-8 justify-center" />
			</div>

			<Img
				image={image}
				className={cn(
					"anim-fade-to-t [animation-duration:1s]",
					image?.faded && "[mask-image:linear-gradient(to_bottom,#000_50%,transparent)]",
				)}
				draggable={false}
				alt={image?.alt || "hero image"}
			/>
		</section>
	);
}
