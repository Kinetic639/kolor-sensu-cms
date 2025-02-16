import { PortableText } from "@portabletext/react";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img from "@/app/ui/Img";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { EdgeBlob } from "@/app/ui/atoms/edge-blob/edge-blob";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import { MotionDiv } from "@/app/ui/motion/MotionDiv";

export default function HeroMosaic({
	pretitle,
	content,
	ctas,
	mosaicImages,
	backgroundType,
	backgroundImage,
}: Partial<{
	pretitle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	mosaicImages: Sanity.Image[];
	backgroundType: string;
	backgroundImage: Sanity.Image;
}>) {
	// Add debugging logs
	console.log("HeroMosaic Props:", {
		pretitle,
		content,
		ctas,
		mosaicImages,
		backgroundType,
		backgroundImage,
	});

	console.log(mosaicImages);
	console.log(content);
	console.log(mosaicImages);

	return (
		<section
			className={cn(
				"relative",
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
					className="absolute inset-0 z-[-999] h-full w-full object-cover"
				/>
			)}

			{/* Optional Blob Background */}
			{backgroundType === "blob" && <EdgeBlob />}

			<div className="relative z-10 mx-auto grid max-w-screen-xl items-stretch gap-6 px-4 py-16 pt-10 md:grid-cols-2 md:gap-x-12 md:pt-16">
				{/* Content Section */}
				<MotionDiv
					className="mx-auto flex w-full max-w-lg flex-col justify-center md:text-left"
					initial={{ opacity: 0, y: 50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 },
					}}
				>
					{pretitle && (
						<MotionDiv
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<Typography as="h1" variant="h1" className="mb-4 text-center font-bold md:text-left">
								{pretitle}
							</Typography>
						</MotionDiv>
					)}
					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className="text-center md:text-left"
					>
						<PortableText value={content} components={customPortableTextComponents} />
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="w-full"
					>
						<CTAList ctas={ctas} className="mt-8 w-full" />
					</MotionDiv>
				</MotionDiv>

				{/* Mosaic Images Section */}
				<MotionDiv
					className="relative grid grid-cols-3 gap-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6, ease: "easeIn" }}
				>
					{mosaicImages?.map((image, index) => (
						<MotionDiv
							key={index}
							className="aspect-square overflow-hidden rounded-full"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: index * 0.1,
								duration: 0.5,
								ease: "easeOut",
							}}
							style={{
								transform: `translate(${Math.sin(index) * 20}px, ${Math.cos(index) * 20}px)`,
							}}
						>
							<Img
								image={image}
								imageWidth={400}
								alt={image?.alt || `Team member ${index + 1}`}
								className="h-full w-full object-cover"
							/>
						</MotionDiv>
					))}
				</MotionDiv>
			</div>
		</section>
	);
}
