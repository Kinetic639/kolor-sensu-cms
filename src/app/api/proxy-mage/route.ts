import { NextResponse } from "next/server";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const imageUrl = searchParams.get("url");

	if (!imageUrl) {
		return new NextResponse("Missing URL parameter", { status: 400 });
	}

	const response = await fetch(imageUrl);
	const imageBuffer = await response.arrayBuffer();

	return new NextResponse(imageBuffer, {
		headers: {
			"Content-Type": response.headers.get("Content-Type") || "image/jpeg",
			"Cache-Control": "public, max-age=86400",
		},
	});
}
