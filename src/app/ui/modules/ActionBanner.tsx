import Image from "next/image";
import { cn } from "@/lib/utils";
import CTA from "@/app/ui/CTA/CTA";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function ActionBanner({
	heading,
	cta,
	colorVariant = "darkBlue",
}: Partial<{
	heading: string;
	cta: Sanity.CTA;
	colorVariant?: "darkBlue" | "light" | "green";
}>) {
	return (
		<div
			className={cn(
				"relative mx-auto my-6 w-full max-w-screen-xl overflow-hidden bg-[#2D4148] px-4 py-12 text-center text-white md:my-24 md:px-16 md:py-16 lg:rounded-[40px]",
				colorVariant === "light" && "bg-gray-100 text-foreground",
				colorVariant === "green" && "bg-emerald-600",
			)}
		>
			<Typography variant="h3" as="h3" className="mb-8 font-bold md:mb-12" alignment="center">
				{heading}
			</Typography>
			<div className="relative inline-flex items-center">
				<CTA
					{...cta}
					className="inline-flex rounded-full bg-[#F4B223] px-8 py-4 text-base text-foreground transition-all duration-300 ease-in-out hover:scale-105 hover:bg-foreground-hover hover:text-white md:px-12 md:py-6 md:text-lg"
				/>
				<Image
					src="/icons/arrow.png"
					alt=""
					width={80}
					height={80}
					className="absolute -right-20 -top-4 hidden lg:block"
				/>
			</div>
		</div>
	);
}
