import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img from "@/app/ui/Img";
import { Typography } from "@/app/ui/atoms/Typography/Typography";
import { MotionDiv } from "@/app/ui/motion/MotionDiv";
import { SingleBlob } from "@/app/ui/atoms/single-blob/single-blob";

export default function HeroModern({
	title,
	subtitle,
	ctas,
	image,
	backgroundType,
	backgroundImage,
}: Partial<{
	title: string;
	subtitle: string;
	frameStyle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { onRight?: boolean; frameStyle?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
}>) {
	return (
		<section
			className={cn(
				"relative min-h-[90vh]",
				backgroundType === "solid" && "bg-white",
				backgroundType === "blob" && "relative",
			)}
		>
			{/* Render Background Image */}
			{backgroundImage?.asset && (
				<Img
					image={backgroundImage}
					imageWidth={1800}
					alt={backgroundImage?.alt || "Background Image"}
					className="object-fit absolute inset-0 z-[10] mx-auto h-full w-auto opacity-80"
				/>
			)}

			{/* Optional Blob Background */}
			{backgroundType === "blob" && <SingleBlob />}

			<div className="relative z-10 mx-auto flex min-h-[80vh] max-w-screen-xl flex-1 items-center py-20">
				<div className={cn("max-md:full-bleed flex-1", image?.onRight && "md:order-1")}></div>

				<MotionDiv
					className={cn(
						"mx-auto max-w-lg flex-shrink flex-col justify-center",
						// image?.onRight ? "md:text-right" : "md:text-left",
					)}
					initial={{ opacity: 0, y: 50 }}
					animate={{
						opacity: 1,
						y: 0,
						transition: { duration: 1, ease: "easeOut", staggerChildren: 0.2 },
					}}
				>
					{title && (
						<MotionDiv
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.2 }}
						>
							<Typography
								as="h1"
								variant={"h5"}
								className={cn(
									"mb-4 text-center text-[48px] font-bold uppercase text-foreground-secondary",
									// image?.onRight ? "md:text-right" : "md:text-left",
								)}
							>
								{title}
							</Typography>
						</MotionDiv>
					)}
					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className={cn("text-center")}
					>
						<Typography
							as="h2"
							variant="h2"
							className="text-center font-medium text-foreground-secondary"
						>
							{subtitle}
						</Typography>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="w-full"
					>
						<CTAList onRight={image?.onRight} ctas={ctas} className="mt-8 w-full" />
					</MotionDiv>
				</MotionDiv>
			</div>
		</section>
	);
}
