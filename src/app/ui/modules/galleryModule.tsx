import EmblaCarousel from "@/app/ui/modules/EmblaCarousel/EmblaCarousel";

export default function GalleryModule({
	gallery,
	showCaptions = false,
	captionPosition = "center",
	captionStyle = "overlay",
	captionAlignment = "center",
}: {
	title: string;
	description: string;
	gallery: {
		_id: string;
		title: string;
		description: string;
		images: {
			asset: { url: string };
			alt?: string;
			title: string;
			description: string;
		}[];
	};
	showCaptions?: boolean;
	captionPosition?: "top" | "left" | "center" | "right";
	captionStyle?: "overlay" | "aside";
	captionAlignment?: "left" | "center" | "right";
}) {
	if (!gallery) return null;

	const slides = gallery.images.map((image) => ({
		image,
		alt: image.alt,
		title: image.title,
		description: image.description,
	}));

	return (
		<section className="pb-12">
			<EmblaCarousel
				slides={slides}
				showCaptions={showCaptions}
				captionPosition={captionPosition}
				captionStyle={captionStyle}
				captionAlignment={captionAlignment}
			/>
		</section>
	);
}
