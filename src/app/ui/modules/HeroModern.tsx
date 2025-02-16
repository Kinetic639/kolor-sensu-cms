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
		<section className="relative w-full md:mb-32">
			{/* Background Image */}
			{backgroundImage && (
				<div className="relative flex h-auto w-full justify-end">
					<div className="relative hidden md:block md:w-[80%]">
						<Img
							image={backgroundImage}
							alt="Background"
							className="h-auto w-full object-contain"
						/>
					</div>
					<div className="relative block w-full md:hidden">
						<Img
							image={backgroundImageMobile}
							alt="Background Mobile"
							className="h-auto w-full object-contain"
						/>
					</div>
				</div>
			)}

			{backgroundType === "blob" && <SingleBlob />}

			{/* Content Container */}
			<div className="absolute inset-0 z-10 mx-auto flex h-full w-full max-w-screen-xl items-center justify-center px-4 py-6 lg:justify-start">
				<MotionDiv
					className={cn("w-full max-w-lg flex-shrink flex-col justify-center gap-4 px-4 lg:px-0")}
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
									"mb-3 text-center text-lg font-medium uppercase text-foreground-secondary lg:text-xl",
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
						className={cn("my-4 text-center")}
					>
						<h2 className="text-center text-2xl font-medium leading-relaxed text-foreground-secondary sm:text-3xl lg:text-5xl">
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
