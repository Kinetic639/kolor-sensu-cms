"use client";
import { useEffect, useState } from "react";

interface EmbeddedPageProps {
	externalUrl: string;
}

export default function EmbeddedPage({ externalUrl }: EmbeddedPageProps) {
	const [content, setContent] = useState<string | null>(null);

	useEffect(() => {
		fetch(externalUrl)
			.then((res) => res.text())
			.then((html) => {
				// Fix all relative paths (images, styles, scripts)
				let fixedHtml = html.replace(
					/(src=["']|href=["'])(?!https?:\/\/)([^"']+)/g,
					`$1${externalUrl}$2`,
				);

				// Inject custom CSS to enforce full width
				const styleInjection = `
                    <style>
                        body, html {
                            width: 100%;
                            max-width: 100%;
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }
                        .container {
                            max-width: 100% !important; 
                            width: 100% !important;
                        }
                    </style>
                `;

				fixedHtml = fixedHtml.replace("</head>", `${styleInjection}</head>`);

				setContent(fixedHtml);
			})
			.catch(() => setContent("<p>Failed to load page</p>"));
	}, [externalUrl]);

	return (
		<div className="mx-auto min-h-screen w-full max-w-screen-lg">
			{content ? (
				<div dangerouslySetInnerHTML={{ __html: content }} />
			) : (
				<p className="text-center text-gray-500">Loading...</p>
			)}
		</div>
	);
}
