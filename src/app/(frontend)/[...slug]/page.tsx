import { notFound } from "next/navigation";
import React from "react";
import client from "@/lib/sanity/client";
import { fetchSanity, groq } from "@/lib/sanity/fetch";
import processMetadata from "@/lib/processMetadata";
import { modulesQuery } from "@/lib/sanity/queries";

export default async function Page({ params }: Props) {
	const page = await getPage(params);
	if (!page) notFound();
	return (
		<div>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
			<pre>{JSON.stringify(page, null, 2)}</pre>
		</div>
	);
}

export async function generateMetadata({ params }: Props) {
	const page = await getPage(params);
	if (!page) notFound();
	return processMetadata(page);
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[
			_type == 'page' &&
			defined(metadata.slug.current) &&
			!(metadata.slug.current in ['index', '404', 'blog/*'])
		].metadata.slug.current`,
	);

	return slugs.map((slug) => ({ slug: slug.split("/") }));
}

async function getPage(params: Props["params"]) {
	return fetchSanity<Sanity.Page>(
		groq`*[
			_type == 'page' &&
			metadata.slug.current == $slug &&
			!(metadata.slug.current in ['index', '404', 'blog/*'])
		][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		{
			params: { slug: params.slug?.join("/") },
			tags: ["pages"],
		},
	);
}

type Props = {
	params: { slug?: string[] };
};
