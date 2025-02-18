import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img from "@/app/ui/Img";
import { MotionDiv } from "@/app/ui/motion/MotionDiv";
import { SingleBlob } from "@/app/ui/atoms/single-blob/single-blob";

export default function HeroModern({
	title,
	subtitle,
	ctas,
	image,
	backgroundType,
	backgroundImage,
	backgroundImageMobile,
}: Partial<{
	title: string;
	subtitle: string;
	frameStyle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	image: Sanity.Image & { onRight?: boolean; frameStyle?: string };
	backgroundType: string;
	backgroundImage: Sanity.Image;
	backgroundImageMobile: Sanity.Image;
}>) {
	return (
		<section className="relative w-full border-b-orange-500 md:mb-32">
			{/* Background Image */}
			{backgroundImage && (
				<div className="absolute inset-0 -z-20 flex justify-end">
					<div className="hidden md:block">
						<Img image={backgroundImage} alt="Background" className="h-full w-auto object-cover" />
					</div>
					<div className="relative block w-full md:hidden">
						<Img
							image={backgroundImageMobile}
							alt="Background Mobile"
							className="h-auto w-full object-cover"
						/>
					</div>
				</div>
			)}

			{/* Single Blob */}
			{backgroundType === "blob" && <SingleBlob />}

			{/* Content Container */}
			<div className="relative z-[11] mx-auto flex min-h-[550px] w-full max-w-screen-xl items-center pb-24 md:min-h-[800px] md:pb-0">
				<MotionDiv
					className={cn("w-full max-w-lg flex-shrink flex-col justify-center gap-6 px-4 lg:px-0")}
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
							className=""
						>
							<h1
								className={cn(
									"text-center text-lg font-medium uppercase text-foreground-secondary lg:text-xl",
								)}
							>
								{title}
							</h1>
						</MotionDiv>
					)}
					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.4 }}
						className={cn("mb-12 mt-6 text-center")}
					>
						<h2 className="text-center text-3xl font-medium leading-relaxed text-foreground-secondary sm:text-3xl lg:text-5xl">
							{subtitle}
						</h2>
					</MotionDiv>

					<MotionDiv
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ delay: 0.6 }}
						className="w-full"
					>
						<CTAList
							onRight={image?.onRight}
							ctas={ctas}
							className="mt-6 w-full text-center lg:text-left"
						/>
					</MotionDiv>
				</MotionDiv>
			</div>
		</section>
	);
}
