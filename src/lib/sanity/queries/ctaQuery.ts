import { groq } from "../fetch";
import { linkQuery } from "./linkQuery";

export const ctaQuery = groq`
	...,
	link{ ${linkQuery} }
`;