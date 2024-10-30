import { createClient } from "next-sanity";
import groq from "groq";

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	apiVersion: "2024-07-01",
	useCdn: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", port: "" }],
	},

	async redirects() {
		return await client.fetch(groq`*[_type == 'redirect']{
			source,
			destination,
			permanent
		}`);
	},

	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
};

export default nextConfig;
