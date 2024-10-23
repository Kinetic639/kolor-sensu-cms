import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img from "@/app/ui/Img";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { EdgeBlob } from "@/app/ui/atoms/edge-blob/edge-blob";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import { ImageBlobFrame } from "@/app/ui/blob-image-frame";
import { MotionDiv } from "@/app/ui/motion/MotionDiv";

export default function HeroSplit({
	pretitle,
	content,
	ctas,
	image,
	backgroundType,
}: Partial<{
	pretitle: string;
	frameStyle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { onRight?: boolean; frameStyle?: string };
	backgroundType: string;
}>) {
	const cleanedFrameStyle = image?.frameStyle
		?.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();

	return (
		<section className={cn("relative", backgroundType === "solid" && "bg-background")}>
			{backgroundType === "blob" && <EdgeBlob />}
			<div className="relative mx-auto grid max-w-screen-xl items-center gap-6 p-4 pb-24 md:grid-cols-2 md:gap-x-12">
				<figure className={cn("max-md:full-bleed", image?.onRight && "md:order-1")}>
					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, ease: "easeIn" }}
					>
						{cleanedFrameStyle === "blob" ? (
							<ImageBlobFrame image={image} />
						) : (
							<Img
								image={image}
								imageWidth={1200}
								alt={image?.alt || "Hero Image"}
								className={cn(
									cleanedFrameStyle === "blob" && "blob-frame",
									cleanedFrameStyle === "circle" && "circle-frame",
									cleanedFrameStyle === "rectangle" && "rectangle-frame",
								)}
							/>
						)}
					</MotionDiv>
				</figure>

				<MotionDiv
					className={cn(
						"mx-auto flex w-full max-w-lg flex-col justify-center",
						image?.onRight && "items-end text-right",
					)}
					initial={{ opacity: 0, y: 50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 },
					}}
				>
					<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
						<Typography as="h1" variant="h1" className="mb-4 text-center font-bold md:text-left">
							{pretitle}
						</Typography>
					</MotionDiv>

					<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
						<PortableText value={content} components={customPortableTextComponents} />
					</MotionDiv>

					<MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
						<CTAList ctas={ctas} className="mt-8" />
					</MotionDiv>
				</MotionDiv>
			</div>
		</section>
	);
}
