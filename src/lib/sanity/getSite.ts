import { ctaQuery, navigationQuery } from "./queries";
import { fetchSanity, groq } from "@/lib/sanity/fetch";

export async function getSite() {
	const site = await fetchSanity<Sanity.Site>(
		groq`
			*[_type == 'site'][0]{
				...,
				ctas[]{ ${ctaQuery} },
				headerMenu->{ ${navigationQuery} },
				footerMenu->{ ${navigationQuery} },
				social->{ ${navigationQuery} },
				'ogimage': ogimage.asset->url
			}
		`,
		{ tags: ["site"] },
	);

	if (!site) throw new Error("Missing 'site' document in Sanity Studio");

	return site;
}
