import { q, InferType, sanityImage } from "groqd";

const getImage = (name: string) =>
  sanityImage(name, {
    withCrop: true,
    withHotspot: true,
    withAsset: ["base", "lqip"],
  });

export const getEditorialArticle = q("*")
  .filterByType("editorialArticle")
  .filter(`slug == "$slug" && !(_id in path('drafts.**'))`)
  .slice(0)
  .grab$({
    title: q.string(),
    mainImage: getImage("mainImage"),
    publishedAt: q.date(),
    body: q.contentBlocks(),
  });

export type EditorialArticleData = InferType<typeof getEditorialArticle>;
