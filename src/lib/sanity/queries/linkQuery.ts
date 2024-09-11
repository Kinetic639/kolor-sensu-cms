import { groq } from "../fetch";

export const linkQuery = groq`
	...,
	internal->{ _type, title, metadata }
`;