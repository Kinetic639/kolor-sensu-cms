import React from "react";
import { Button } from "@/components/ui/button";

interface ProductsModuleProps {
	title: string;
	description?: string;
	products: Sanity.Product[];
}

export default function ProductsModule({ title, description, products }: ProductsModuleProps) {
	return (
		<section className="mx-auto w-full max-w-screen-xl px-1 pt-16 md:px-4">
			<h2 className="mb-4 text-2xl font-bold">{title}</h2>
			{description && <p className="mb-8">{description}</p>}
			<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{products.map((product) => (
					<div
						key={product._id}
						className="rounded-lg p-4 shadow-md transition-shadow duration-300 hover:shadow-lg"
					>
						{/*<Img*/}
						{/*	image={product.image}*/}
						{/*	alt={product.image.alt || "miniatura produktu"}*/}
						{/*	imageWidth={1200}*/}
						{/*	className="h-34 aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"*/}
						{/*/>*/}
						{/*<pre>{JSON.stringify(product, null, 2)}</pre>*/}
						<h3 className="mt-4 text-xl font-semibold">{product.title}</h3>
						<p className="text-gray-700">{product.description}</p>
						<a
							href={product.link}
							target="_blank"
							className="mx-auto mt-2 inline-block text-primary hover:underline"
						>
							<Button>Szczegóły</Button>
						</a>
					</div>
				))}
			</div>
		</section>
	);
}
