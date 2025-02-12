import Hero from "./Hero";
import HeroSplit from "./HeroSplit";
import HeroSaaS from "./HeroSaaS";
import ActionBanner from "./ActionBanner";
import SpecialistsSection from "@/app/ui/modules/SpecialistsSection";
import Banner from "@/app/ui/Banner";
import CardSection from "@/app/ui/modules/CardSection";
import FAQModule from "@/app/ui/modules/FaqModule";
import GalleryModule from "@/app/ui/modules/galleryModule";
import ServicesModule from "@/app/ui/modules/ServicesModule";
import ContactModule from "@/app/ui/modules/ContactModule";
import { ConsultationTestModule } from "@/app/ui/modules/ConsultationTestModule/ConsultationTestModule";
import BlogList from "@/app/ui/modules/blog/BlogList";
import PostContent from "@/app/ui/modules/blog/PostContent";
import ProductsModule from "@/app/ui/modules/productsModule";
import PodcastModule from "@/app/ui/modules/PodcastModule";
import HeroModern from "@/app/ui/modules/HeroModern";
import SplitContent from "@/app/ui/SplitContent";
import HeroWithCard from "@/app/ui/modules/HeroWtihCard";
import BannerText from "@/app/ui/modules/BannerText";
import HeroMosaic from "@/app/ui/modules/HeroMosaic";

export default function Modules({
	modules,
	post,
}: {
	modules?: Sanity.Module[];
	page?: Sanity.Page;
	post?: Sanity.BlogPost;
}) {
	return (
		<>
			{modules?.map((module) => {
				switch (module._type) {
					// case "blog-post-content":
					// 	return <PostContent {...module} post={post} key={module._key} />;
					// case "blog-list":
					// 	return <BlogList {...module} key={module._key} />;
					// case "hero":
					// 	return <Hero {...module} key={module._key} />;
					// case "hero.split":
					// 	return <HeroSplit {...module} key={module._key} />;
					// case "hero.mosaic":
					// 	return <HeroMosaic {...module} key={module._key} />;
					case "hero.modern":
						return <HeroModern {...module} key={module._key} />;
					// case "hero.saas":
					// 	return <HeroSaaS {...module} key={module._key} />;
					// case "banner":
					// 	return <Banner {...module} key={module._key} />;
					// case "cardsSection":
					// 	return <CardSection {...module} key={module._key} />;
					// case "specialistsModule":
					// 	return (
					// 		<SpecialistsSection {...(module as Sanity.SpecialistsModule)} key={module._key} />
					// 	);
					// case "galleryModule":
					// 	return <GalleryModule {...(module as Sanity.GalleryModule)} key={module._key} />;
					// case "faqModule":
					// 	return <FAQModule {...module} key={module._key} />;
					// case "servicesModule":
					// 	return <ServicesModule {...(module as Sanity.ServicesModule)} key={module._key} />;
					// case "contactModule":
					// 	return <ContactModule {...module} key={module._key} />;
					// case "consultationTestModule":
					// 	return <ConsultationTestModule {...module} key={module._key} />;
					// case "productsModule":
					// 	return <ProductsModule {...(module as Sanity.ProductsModule)} key={module._key} />;
					// case "podcastModule":
					// 	return <PodcastModule key={module._key} />;
					case "splitContent": // Add new case for SplitContent
						return <SplitContent {...module} key={module._key} />;
					// case "hero.withCard": // Add new case for SplitContent
					// 	return <HeroWithCard {...module} key={module._key} />;
					// case "bannerText": // Add new case for SplitContent
					// 	return <BannerText {...module} key={module._key} />;
					// case "actionBanner": // Add new case for SplitContent
					// 	return <ActionBanner {...module} key={module._key} />;

					default:
						return <div key={module._key} />;
				}
			})}
		</>
	);
}
