import { PortableText } from "@portabletext/react";
import { stegaClean } from "@sanity/client/stega";
import css from "./Hero.module.css";
import { cn } from "@/lib/utils";
import CTAList from "@/app/ui/CTA/CTAList";
import Img, { Source } from "@/app/ui/Img";
import { customPortableTextComponents } from "@/app/ui/CustomPortableText";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

export default function Hero({
	pretitle,
	content,
	ctas,
	bgImage,
	bgImageMobile,
	textAlign = "center",
	alignItems,
	backgroundColor,
	textColor,
}: Partial<{
	pretitle: string;
	content: Sanity.BlockContent;
	ctas: Sanity.CTA[];
	backgroundType: string;
	bgImage: Sanity.Image;
	bgImageMobile: Sanity.Image;
	textAlign: React.CSSProperties["textAlign"];
	alignItems: React.CSSProperties["alignItems"];
	backgroundColor: { value: string };
	textColor: { value: string };
}>) {
	const hasImage = !!bgImage?.asset;
	const defaultBackgroundColor = "#c4d6c2"; // Default background color
	const defaultTextColor = "text-foreground"; // Default text color

	return (
		<section
			className={cn(
				hasImage &&
					"mx-auto grid w-full max-w-screen-xl overflow-hidden bg-ink text-canvas *:col-span-full *:row-span-full",
			)}
		>
			{bgImage?.asset && (
				<picture>
					<Source image={bgImageMobile} imageWidth={1200} />
					<Img
						className="size-full max-h-fold object-cover"
						image={bgImage}
						imageWidth={1800}
						draggable={false}
						alt={bgImage?.alt || "Background Image"}
					/>
				</picture>
			)}

			{content && (
				<div
					className={cn("section mx-auto flex w-full max-w-screen-xl flex-col px-0 py-12 md:px-4")}
				>
					<div
						style={{
							backgroundColor:
								backgroundColor?.value
									.replace(/[\u200B-\u200D\uFEFF]/g, "")
									.trim()
									.toLowerCase() || defaultBackgroundColor,
							color:
								textColor?.value
									.replace(/[\u200B-\u200D\uFEFF]/g, "")
									.trim()
									.toLowerCase() || defaultTextColor,
							textAlign: stegaClean(textAlign),
						}}
						className={cn(
							"relative isolate mx-auto w-full rounded-md px-4 py-8 md:px-6 [&_:is(h1,h2)]:text-balance",
							bgImage?.asset && "text-shadow shadow-xl",
							!bgImage?.asset && "shadow-lg",
							hasImage && css.txt,
							{
								"mb-8": stegaClean(alignItems) === "start",
								"my-auto": stegaClean(alignItems) === "center",
								"mt-auto": stegaClean(alignItems) === "end",
							},
							{
								"mr-auto": stegaClean(textAlign) === "left",
								"mx-auto": stegaClean(textAlign) === "center",
								"ml-auto": stegaClean(textAlign) === "right",
							},
						)}
					>
						<Typography as="h1" variant="h4" className="mb-4">
							{pretitle}
						</Typography>

						<PortableText value={content} components={customPortableTextComponents} />
						<CTAList
							ctas={ctas}
							className={cn("!mt-4", {
								"justify-start": stegaClean(textAlign) === "left",
								"justify-center": stegaClean(textAlign) === "center",
								"justify-end": stegaClean(textAlign) === "right",
							})}
						/>
					</div>
				</div>
			)}
		</section>
	);
}
