import Hero from "./Hero";
import HeroSplit from "./HeroSplit";
import HeroSaaS from "./HeroSaaS";
import SpecialistsSection from "@/app/ui/modules/SpecialistsSection";
import Banner from "@/app/ui/Banner";
import CardSection from "@/app/ui/modules/CardSection";
import GalleryModule from "@/app/ui/modules/galleryModule";
import FAQModule from "@/app/ui/modules/FaqModule";

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
					case "specialistsModule": // Add the new case for specialists
						return (
							<SpecialistsSection {...(module as Sanity.SpecialistsModule)} key={module._key} />
						);
					case "galleryModule": // Add the new case for gallery
						return <GalleryModule {...(module as Sanity.GalleryModule)} key={module._key} />;
					case "faqModule":
						return <FAQModule {...module} key={module._key} />;
					default:
						return <div data-type={module._type} key={module._key} />;
				}
			})}
		</>
	);
}
