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
	backgroundImage,
}: Partial<{
	pretitle: string;
	frameStyle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { onRight?: boolean; frameStyle?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
}>) {
	const cleanedFrameStyle = image?.frameStyle
		?.replace(/[\u200B-\u200D\uFEFF]/g, "")
		.trim()
		.toLowerCase();

	return (
		<section
			className={cn(
				"relative min-h-[60vh] w-full py-8 md:py-16",
				backgroundType === "solid" && "bg-background",
				backgroundType === "blob" && "relative",
			)}
		>
			{/* Render Background Image */}
			{backgroundImage?.asset && (
				<Img
					image={backgroundImage}
					imageWidth={1800}
					alt={backgroundImage?.alt || "Background Image"}
					className="absolute inset-0 z-0 h-full w-full object-cover opacity-50"
				/>
			)}

			{/* Optional Blob Background */}
			{backgroundType === "blob" && <EdgeBlob />}

			<div className="relative z-0 mx-auto grid max-w-screen-xl items-center gap-8 px-4 md:grid-cols-2 md:gap-12 lg:px-8">
				<figure
					className={cn(
						"relative w-full",
						image?.onRight && "md:order-1",
						"max-md:mx-auto max-md:max-w-[80%]",
					)}
				>
					<MotionDiv
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5, ease: "easeOut" }}
					>
						{cleanedFrameStyle === "blob" ? (
							<ImageBlobFrame image={image} />
						) : (
							<Img
								image={image}
								imageWidth={1200}
								alt={image?.alt || "Hero Image"}
								className={cn(
									"z-10 w-full",
									cleanedFrameStyle === "circle" && "circle-frame",
									cleanedFrameStyle === "rectangle" && "rectangle-frame rounded-lg shadow-lg",
								)}
							/>
						)}
					</MotionDiv>
				</figure>

				<MotionDiv
					className={cn(
						"flex flex-col gap-6",
						"text-center md:text-left",
						image?.onRight && "md:text-right",
						"max-md:px-4",
					)}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					{pretitle && (
						<Typography as="h1" variant={image?.onRight ? "h3" : "h1"} className="font-bold">
							{pretitle}
						</Typography>
					)}

					<div className="prose dark:prose-invert max-w-none">
						<PortableText value={content} components={customPortableTextComponents} />
					</div>

					<CTAList onRight={image?.onRight} ctas={ctas} className="mt-4 w-full md:mt-6" />
				</MotionDiv>
			</div>
		</section>
	);
}
