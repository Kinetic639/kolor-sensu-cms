"use client";
import { NextStudio } from "next-sanity/studio";
import config from "@sanity/sanity.config"


export function Studio() {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	return <NextStudio config={config} />;
}
