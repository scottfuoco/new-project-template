// import { FILE_UPLOAD_MIME_TYPES } from "@package/utils-shared";
import { q, InferType, sanityImage } from "groqd";

const getImage = (name: string) =>
  sanityImage(name, {
    withCrop: true,
    withHotspot: true,
    withAsset: ["base", "lqip"],
  });

// const mimeTypes = FILE_UPLOAD_MIME_TYPES.map((mimeType) => q.literal(mimeType));

export const getArticle = q("*")
  .filter(`slug.current == $slug && !(_id in path('drafts.**'))`)
  .slice(0)
  .grab$({
    articleType: ["_type", q.string()],
    title: q.string(),
    mainImage: getImage("mainImage"),
    publishedAt: q.date(),
    documents: q("documents")
      .filter()
      .grab$({
        asset: q("asset")
          .deref()
          .grab$({
            fileName: ["originalFilename", q.string()],
            mimeType: q.union([
              // TODO: figure out why mimeTypes variable doesn't work here
              q.literal("application/pdf"),
              q.literal("video/mp4"),
              q.literal("video/webm"),
              q.literal("video/ogg"),
              q.literal("image/jpeg"),
              q.literal("image/png"),
              q.literal("image/gif"),
              q.literal("image/svg+xml"),
              q.literal("application/msword"),
              q.literal(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
              ),
              q.literal("application/vnd.ms-excel"),
              q.literal(
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              ),
            ]),
            url: q.string(),
          }),
      })
      .nullable(),
    body: q("body", { isArray: true })
      .filter()
      .select({
        '_type == "block"': ["{...}", q.contentBlock()],
        '_type == "image"': ["{...}", sanityImage("").schema],
        '_type == "quoteBlock"': {
          _type: q.string(),
          quoteTitle: q.string(),
          quoteText: q.string(),
          quoteAuthor: q.string(),
        },
        '_type == "imageTextBlock"': {
          _type: q.string(),
          imageLabel: q.string(),
          content: q("content"),
          imagePosition: q.string(),
          blockImage: getImage("blockImage"),
        },
        '_type == "videoBlock"': {
          _type: q.string(),
          url: q.string(),
        },
        '_type == "imageBlock"': {
          _type: q.string(),
          description: q.string(),
          image: getImage("image"),
        },
        '_type == "carouselBlock"': {
          _type: q.string(),
          list: q("list")
            .filter()
            .select({
              '_type == "item"': {
                _type: q.string(),
                description: q.string(),
                image: getImage("image"),
              },
            }),
        },
        '_type == "powerBIBlock"': {
          _type: q.string(),
          reportTitle: q.string(),
          reportId: q.string(),
          workspaceId: q.string(),
          datasetId: q.string(),
          reportHeight: q.number(),
        },
        default: {
          _key: q.string(),
          _type: ['"unsupported"', q.literal("unsupported")],
          unsupportedType: ["_type", q.string()],
        },
      }),
  });

export type ArticleData = InferType<typeof getArticle>;

export type ArticleBody = ArticleData["body"];
export type HeroSectionData = ArticleData["mainImage"];

export type DownloadableDocuments = ArticleData["documents"];

// TODO: figure out how to use Extract to get this type out of ArticleBody
export type PowerBIBlockCMS = {
  _type: "powerBIBlock";
  reportTitle: string;
  reportId: string;
  workspaceId: string;
  datasetId: string;
};
