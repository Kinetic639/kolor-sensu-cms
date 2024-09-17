import Image from "next/image";
import { useNextSanityImage, type UseNextSanityImageOptions } from "next-sanity-image";
import { stegaClean } from "@sanity/client/stega";
import client from "@/lib/sanity/client";
import { urlFor } from "@/lib/sanity/urlFor";

const SIZES = [
	120, 160, 200, 240, 320, 400, 480, 520, 560, 600, 640, 800, 960, 1280, 1440, 1600, 1800, 2000,
];

export default function Img({
	image,
	imageWidth,
	alt = "",
	options,
	...props
}: {
	image: Sanity.Image | undefined;
	imageWidth?: number;
	imageSizes?: number[];
	options?: UseNextSanityImageOptions;
} & Omit<React.ComponentProps<typeof Image>, "src" | "width" | "height">) {
	if (!image?.asset) return null;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { src, width, height } = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	);

	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt={stegaClean(image.alt) || alt}
			loading={stegaClean(image.loading) || "lazy"}
			{...props} // Pass additional props to the Image component
		/>
	);
}

export function Source({
	image,
	imageWidth,
	imageSizes = SIZES,
	options,
	media = "(max-width: 768px)",
}: {
	image: Sanity.Image | undefined;
	imageWidth?: number;
	imageSizes?: number[];
	options?: UseNextSanityImageOptions;
	media?: string;
}) {
	if (!image) return null;

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { src } = useNextSanityImage(
		client,
		image,
		imageWidth ? { imageBuilder: (b) => b.width(imageWidth) } : options,
	);

	return (
		<source
			srcSet={generateSrcset(image, { width: imageWidth, sizes: imageSizes }) || src}
			media={media}
		/>
	);
}

function generateSrcset(
	image: Sanity.Image,
	{
		width,
		sizes = SIZES,
	}: {
		width?: number;
		sizes: number[];
	},
) {
	return (
		sizes
			.filter((size) => !width || size <= width)
			.map((size) => `${urlFor(image).width(size).auto("format").url()} ${size}w`)
			.join(", ") || undefined
	);
}
