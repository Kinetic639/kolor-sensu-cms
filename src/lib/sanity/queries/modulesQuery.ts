import { groq } from "../fetch";
import { linkQuery } from "./linkQuery";
import { ctaQuery } from "./ctaQuery";

export const modulesQuery = groq`
  ...,
  ctas[]{
    ...,
    link{ ${linkQuery} }
  },
  _type == 'blog-list' => { predefinedFilters[]-> },
  _type == 'breadcrumbs' => { crumbs[]{ ${linkQuery} } },
  _type == 'creative-module' => {
    modules[]{
      ...,
      subModules[]{
        ...,
        ctas[]{ ${ctaQuery} }
      }
    }
  },
  _type == 'hero' => { reputation-> },
  _type == 'hero.saas' => { reputation-> },
  _type == 'hero.split' => { reputation-> },
  _type == 'logo-list' => { logos[]-> },
  _type == 'pricing-list' => {
    tiers[]->{
      ...,
      ctas[]{ ${ctaQuery} }
    }
  },
  _type == 'richtext-module' => {
    'headings': select(
      tableOfContents => content[style in ['h2', 'h3', 'h4', 'h5', 'h6']]{
        style,
        'text': pt::text(@)
      }
    ),
  },
  _type == 'faqModule' => {
    title,
    description,
    showTitle,
    showDescription,
    faqNavigation->{
      title,
      items[]{
        question,
        answer
      }
    }
  },
  _type == 'testimonial.featured' => { testimonial-> },
  _type == 'testimonial-list' => { testimonials[]-> },
  _type == 'galleryModule' => {
    title,
    description,
    showCaptions,
    captionPosition,
    gallery->{
      _id,
      title,
      description,
      images[]{
        asset->{
          _id,
          url
        },
        alt,
        title,
        description
      }
    }
  },
  _type == 'cardsSection' => {
    title,
    subtitle,
    fullscreen,
    cards[]->{
      _id,
      title,
      image,
      frontText,
      hoverText,
      faqList->{
        _id,
        title,
        items[]{
          question,
          answer
        }
      }
    }
  },
  _type == 'specialistsModule' => {
    title,
    specialists[]->{
      _id,
      title,
      firstName,
      lastName,
      ctas[] {
        ...,
        link { ${linkQuery} }
      },
      shortDescription,
      fullDescription,
      image{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  },
  _type == 'servicesModule' => {
    title,
    description,
    services[]->{
      _id,
      title,
      description,
      price,
      duration,
      points,
      ctas[]{ ${ctaQuery} }
    }
  },
  _type == 'contactModule' => {
    title,
    description
  },
  _type == 'productsModule' => {
    title,
    description,
    products[]->{
      _id,
      title,
      description,
      image {
        asset->{
          url
        },
        alt
      },
      link
    }
  }
`;
