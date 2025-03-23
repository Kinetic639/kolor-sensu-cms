import { groq } from "../fetch";
import { linkQuery } from "./linkQuery";
import { ctaQuery } from "./ctaQuery";

export const modulesQuery = groq`
  ...,
  _type == 'productSectionModule' => {
    _type,
    _key,
    sectionTitle,
    description[]{
      ...,
      _type,
      _key,
      style,
      children[]{
        ...,
        _type,
        _key,
        marks,
        text
      },
      markDefs[]{
        ...,
        _key,
        _type,
        href,
        color
      }
    },
    reversed,
    image{
      asset->{
        _id,
        url
      },
      alt
    },
    link{ ${linkQuery} },
    productType
  },
  _type == 'embeddedPage' => {
    _type,
    _key,
    embedType,
    externalUrl,
    rawHtml,
    height
  },
  _type == 'richtextModule' => {
    _type,
    _key,
    content,
    tableOfContents,
    tocPosition
  },
  _type == 'actionBanner' => {
    _type,
    _key,
    heading,
    colorVariant,
    cta { ${ctaQuery} }
  },
  ctas[]{
    ...,
    link{ ${linkQuery} }
  },
  _type == 'blog-list' => {
    predefinedFilters[]->,
    textItems[]{
      text,
      icon{
        asset->{
          _id,
          url
        },
        alt
      }
    }
  },
  _type == 'breadcrumbs' => { crumbs[]{ ${linkQuery} } },

  _type == 'hero.withCard' => {
    heading,
    subheading,
    button {
      label,
      link { ${linkQuery} }
    },
    backgroundImage {
      asset->{
        _id,
        url
      },
      alt
    },
    card {
      title,
      items[]{
        icon {
          asset->{
            _id,
            url
          },
          alt
        },
        text
      }
    }
  },
  _type == 'splitContent' => {
    heading[],
    subheading,
    items[]{
      icon {
        asset->{
          _id,
          url
        },
        alt
      },
      text
    },
    image {
      asset->{
        _id,
        url
      },
      alt
    },
    backgroundType,
    backgroundImage {
      asset->{
        _id,
        url
      },
      alt
    },
    backgroundOverlap,
  },
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
  _type == 'hero.modern' => { reputation-> },
  _type == 'hero.mosaic' => {
    _type,
    _key,
    heading[],
    subheading,
    cta { ${ctaQuery} },
    mosaicImages[]{
      _key,
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    },
    backgroundType,
    backgroundImage{
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt,
      hotspot,
      crop
    }
  },
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
    _id,
    _key,
    title,
    description,
    showTitle,
    showDescription,
    showImage,
    image{
      asset->{
        _id,
        url
      },
        alt
    },
    faqNavigations[]{
      _key,
      showTitle,
      navigation->{
        _id,
        title,
        items[]{
          _key,
          question,
          answer
        }
      }
    },
    footerText,
    footerHeading
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
      },
      socials[]{
        type,
        url
      },
      showSocials
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
    phone,
    email,
    richDescription,
    image {
      asset->{
        _id,
        url
      },
      alt
    }
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
        _id,
        url
      },
      alt
    },
      link
    }
  }
`;
