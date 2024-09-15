import Hero from "./Hero";
import HeroSplit from "./HeroSplit";
import HeroSaaS from "./HeroSaaS";
import Banner from "@/app/ui/Banner";
import CardSection from "@/app/ui/modules/CardSection";

export default function Modules({
	modules,
}: {
	modules?: Sanity.Module[];
	page?: Sanity.Page;
	post?: Sanity.BlogPost;
}) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					case "hero":
						return <Hero {...module} key={module._key} />;
					case "hero.split":
						return <HeroSplit {...module} key={module._key} />;
					case "hero.saas":
						return <HeroSaaS {...module} key={module._key} />;
					case "banner":
						return <Banner {...module} key={module._key} />;
					case "cardsSection":
						return <CardSection {...module} key={module._key} />;
					default:
						return <div data-type={module._type} key={module._key} />;
				}
			})}
		</>
	);
}
