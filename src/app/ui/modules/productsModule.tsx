import React from "react";
import { Button } from "@/components/ui/button";
import Img from "@/app/ui/Img";
import { cn } from "@/lib/utils";
import { Typography } from "@/app/ui/atoms/Typography/Typography";

interface ProductsModuleProps {
	title: string;
	description?: string;
	products: Sanity.Product[];
}

export default function ProductsModule({ title, description, products }: ProductsModuleProps) {
	return (
		<section className="mx-auto w-full max-w-screen-xl px-1 pt-6 md:px-4 md:pt-10">
			{title || description ? (
				<div className="flex flex-col pb-4">
					{title && (
						<Typography as="h5" variant="h5">
							{title}
						</Typography>
					)}
					{description && (
						<Typography as="p" variant="body1">
							{description}
						</Typography>
					)}
				</div>
			) : null}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<div
						key={product._id}
						className="flex flex-col justify-between rounded-lg border-2 border-yellow-400 bg-yellow-100 bg-opacity-20 p-4 px-4 py-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
					>
						<Img
							image={product.image}
							alt={product.image.alt || "miniatura produktu"}
							imageWidth={1200}
							className="h-34 aspect-square w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-110"
						/>
						<div className="flex-1 pb-4 pt-2">
							<h3 className="mb-1 mt-4 text-xl font-semibold">{product.title}</h3>
							<Typography as="p" variant="body2">
								{product.description}
							</Typography>
						</div>
						<a
							href={product.link}
							target="_blank"
							className="mx-auto mt-2 inline-block text-primary hover:underline"
						>
							<Button
								className={cn(
									"w-full self-center rounded-full bg-foreground px-6 py-6 text-center",
									"hover:bg-background-secondary hover:text-background",
								)}
							>
								Szczegóły
							</Button>
						</a>
					</div>
				))}
			</div>
		</section>
	);
}
