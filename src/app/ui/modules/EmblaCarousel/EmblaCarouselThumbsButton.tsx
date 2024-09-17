import React from "react";
import Img from "@/app/ui/Img";

type ThumbProps = {
	selected: boolean;
	image: {
		asset: { url: string };
		alt?: string;
	};
	onClick: () => void;
};

export const Thumb: React.FC<ThumbProps> = ({ selected, image, onClick }) => {
	return (
		<div className={"embla-thumbs__slide".concat(selected ? "embla-thumbs__slide--selected" : "")}>
			<button onClick={onClick} type="button" className="embla-thumbs__slide__number">
				<Img
					image={image}
					alt={image.alt || "Thumbnail"}
					className="embla-thumbs__slide__image"
					imageWidth={150}
					loading="lazy"
				/>
			</button>
		</div>
	);
};
