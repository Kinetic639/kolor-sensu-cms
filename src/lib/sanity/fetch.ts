import { draftMode } from "next/headers";
import type { QueryParams, QueryOptions } from "next-sanity";
import client from "@/lib/sanity/client";
import dev from "@/lib/env";

export { default as groq } from "groq";

export function fetchSanity<T = unknown>(
	query: string,
	{
		params = {},
		...next
	}: {
		params?: QueryParams;
	} & QueryOptions["next"] = {},
) {
	const preview = dev || draftMode().isEnabled;

	return client.fetch<T>(
		query,
		params,
		preview
			? {
					stega: true,
					perspective: "previewDrafts",
					useCdn: false,
					token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
					next: {
						revalidate: 0,
						...next,
					},
				}
			: {
					perspective: "published",
					useCdn: true,
					next: {
						revalidate: 3600, // every hour
						...next,
					},
				},
	);
}