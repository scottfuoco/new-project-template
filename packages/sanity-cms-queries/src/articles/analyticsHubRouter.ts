// import { FILE_UPLOAD_MIME_TYPES } from "@package/utils-shared";
import { q, InferType, sanityImage } from "groqd";

const getImage = (name: string) =>
  sanityImage(name, {
    withCrop: true,
    withHotspot: true,
    withAsset: ["base", "lqip"],
  });

// const mimeTypes = FILE_UPLOAD_MIME_TYPES.map((mimeType) => q.literal(mimeType));

export const getAnalyticsHubArticle = q("*")
  .filterByType("analyticsHubArticle")
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
    body: q("body")
      .filter()
      .select({
        '_type == "block"': ["{...}", q.contentBlock()],
        '_type == "image"': ["{...}", sanityImage("").schema],
        default: {
          _key: q.string(),
          _type: ['"unsupported"', q.literal("unsupported")],
          unsupportedType: ["_type", q.string()],
        },
      }),
  });

export type AnalyticsHubArticleData = InferType<typeof getAnalyticsHubArticle>;

export type AnalyticsHubArticleBody = AnalyticsHubArticleData["body"];

export type DownloadableDocuments = AnalyticsHubArticleData["documents"];
