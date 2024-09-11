import { fetchSanity, groq } from "@/lib/sanity/fetch";
import {modulesQuery} from "@/lib/sanity/queries";

export default async function NotFound() {
	const page = await get404();
	if (!page) return <h1 className="section text-center text-5xl">404</h1>;
	// return <Modules modules={page?.modules} />;
	return <pre>{JSON.stringify(page, null, 2)}</pre>;
}

export async function generateMetadata() {
	return (await get404())?.metadata;
}

async function get404() {
	return fetchSanity<Sanity.Page>(
		groq`*[_type == 'page' && metadata.slug.current == '404'][0]{
			...,
			modules[]{ ${modulesQuery} }
		}`,
		{ tags: ["404"] },
	);
}
