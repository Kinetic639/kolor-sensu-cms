import { defineField, defineType } from "sanity";
import { TfiLayoutMediaRight } from "react-icons/tfi";
import { getBlockText } from "@sanity/src/utils";

export default defineType({
  name: "hero.mosaic",
  title: "Hero (Mosaic)",
  icon: TfiLayoutMediaRight,
  type: "object",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "mosaic", title: "Mosaic Images" },
    { name: "background", title: "Background" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({
      name: "subheading",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "cta",
      title: "Call-to-action",
      type: "cta",
      group: "content",
    }),
    defineField({
      name: "mosaicImages",
      title: "Mosaic Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            defineField({ 
              name: "alt", 
              type: "string",
              title: "Alt Text",
            }),
          ],
        }
      ],
      validation: Rule => Rule.max(13),
      group: "mosaic",
    }),
    defineField({
      name: "backgroundType",
      title: "Background Type",
      type: "string",
      options: {
        list: [
          { title: "Solid", value: "solid" },
          { title: "Blob", value: "blob" },
        ],
        layout: "radio",
      },
      initialValue: "blob",
      group: "background",
    }),
  ],
  preview: {
    select: {
      heading: "heading",
      media: "mosaicImages.0.asset",
    },
    prepare: ({ heading, media }) => ({
      title: Array.isArray(heading) ? heading[0] : "Mosaic Hero",
      subtitle: "Hero (Mosaic)",
      media,
    }),
  },
}); 