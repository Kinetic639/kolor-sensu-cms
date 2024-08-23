import React from "react";
import { fetchSanity, groq } from "@/lib/sanity/fetch";
import { modulesQuery } from "@/lib/sanity/queries";
import processMetadata from "@/lib/processMetadata";

export default async function Page() {
	const page = await getPage();
	return <pre>{JSON.stringify(page, null, 2)}</pre>;
}

export async function generateMetadata() {
	const page = await getPage();
	return processMetadata(page);
}

async function getPage() {
	const page = await fetchSanity<Sanity.Page>(
		groq`*[_type == 'page' && metadata.slug.current == 'index'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200',
			}
		}`,
		{ tags: ["homepage"] },
	);

	if (!page) throw new Error("Missing 'page' document with metadata.slug 'index' in Sanity Studio");

	return page;
}
