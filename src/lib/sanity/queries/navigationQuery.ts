import { groq } from "../fetch";
import { linkQuery } from "./linkQuery";

export const navigationQuery = groq`
	title,
	items[]{
		${linkQuery},
		link{ ${linkQuery} },
		links[]{ ${linkQuery} }
	}
`;
