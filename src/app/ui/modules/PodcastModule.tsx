import React from "react";

const clientId = "70763ccaa5b745758491ee362c00a82f";
const clientSecret = "fff42e0fc66645f280a9b387c1f522ae";

interface Episode {
	audio_preview_url: string;
	description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: {
		spotify: string;
	};
	href: string;
	html_description: string;
	id: string;
	images: string[];
	is_externally_hosted: false;
	is_playable: true;
	language: string;
	languages: string[];
	name: string;
	release_date: string;
	release_date_precision: string;
	type: string;
	uri: string;
}

async function getToken() {
	const result = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
		},
		body: "grant_type=client_credentials",
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-return
	return result.json();
}
async function getEpisodes(): Promise<Episode[]> {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const token = await getToken();
	const result = await fetch("https://api.spotify.com/v1/shows/4CrRw1sSrLERK3zXuDDG9m/episodes", {
		method: "GET",
		headers: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			Authorization: "Bearer " + token.access_token,
		},
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await result.json();
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return,@typescript-eslint/no-unsafe-member-access
	return data.items;
}

const PodcastModule = async () => {
	const data = await getEpisodes();
	return (
		<div>
			{/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */}
			{data.map((item: Episode) => (
				<iframe
					key={item.id}
					src={`https://open.spotify.com/embed/episode/${item.id}?utm_source=generator`}
					width="80%"
					height="250"
					allowFullScreen
					allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
					loading="lazy"
					style={{ margin: "0 auto" }}
				></iframe>
			))}
			<div className="min-h-[200px]"></div>
		</div>
	);
};
export default PodcastModule;
