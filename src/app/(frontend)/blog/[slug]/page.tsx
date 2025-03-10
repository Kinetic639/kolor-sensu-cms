import { notFound } from "next/navigation";
import client from "@/lib/sanity/client";
import { fetchSanity, groq } from "@/lib/sanity/fetch";
import { modulesQuery } from "@/lib/sanity/queries";
import processMetadata from "@/lib/processMetadata";
import Modules from "@/app/ui/modules";

export default async function Page({ params }: Props) {
	const page = await getPageTemplate();
	const post = await getPost(params);
	if (!page || !post) notFound();
	return <Modules modules={page?.modules} page={page} post={post} />;
}

export async function generateMetadata({ params }: Props) {
	const post = await getPost(params);
	if (!post) notFound();
	return processMetadata(post);
}

export async function generateStaticParams() {
	const slugs = await client.fetch<string[]>(
		groq`*[_type == 'blog.post' && defined(metadata.slug.current)].metadata.slug.current`,
	);

	return slugs.map((slug) => ({ slug }));
}

async function getPost(params: Props["params"]) {
	return fetchSanity<Sanity.BlogPost>(
		groq`*[_type == 'blog.post' && metadata.slug.current == $slug][0]{
			...,
			'body': select(_type == 'image' => asset->, body),
			'readTime': length(pt::text(body)) / 200,
			'headings': body[style in ['h2', 'h3']]{
				style,
				'text': pt::text(@)
			},
			categories[]->,
				author->{
firstName,
lastName,
      avatar{
        asset->{
          _id,
          url
        },
        alt
      }},
			metadata {
				...,
				'ogimage': image.asset->url + '?w=1200'
			}
		}`,
		{
			params,
			tags: ["blog.post"],
		},
	);
}

async function getPageTemplate() {
	return fetchSanity<Sanity.Page>(
		groq`*[_type == 'page' && metadata.slug.current == 'blog/*'][0]{
			...,
			modules[]{ ${modulesQuery} },
			metadata { slug }
		}`,
		{ tags: ["blog/*"] },
	);
}

type Props = {
	params: { slug?: string };
};
