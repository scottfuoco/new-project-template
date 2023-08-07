import { q, InferType, sanityImage } from "groqd";

// import { InferType, q } from "groqd";

const postTypes = q.union([
  q.literal("editorialArticle"),
  q.literal("researchArticle"),
  q.literal("analyticsHubArticle"),
]);

const getImage = (name: string) =>
  sanityImage(name, {
    withCrop: true,
    withHotspot: true,
    withAsset: ["base", "lqip"],
  });

export const getHomepage = q("*")
  .filter(`_type == "homepage" && !(_id in path('drafts.**'))`)
  .slice(0)
  .grab$({
    heroCarousel: q("heroCarousel[]", { isArray: true }).grab$({
      article: q("article")
        .deref()
        .grab$({
          _type: postTypes,
          title: q.string(),
          slug: q("slug").grabOne("current", q.string()),
          mainImage: getImage("mainImage"),
        }),
    }),
    primaryTags: q("*")
      .filterByType("tags")
      .grab$({
        option: q("option").grab$({
          name: q.string(),
        }),
      }),
    pageBlocks: q("pageBlocks[]", { isArray: true }).select({
      "_type == 'recentPostBlock'": {
        _type: q.literal("recentPostBlock"),
        numPosts: q.number(),
        showFilterBar: q.boolean(),
        key: q("_key"),
        posts: q("*", { isArray: true })
          .filter(
            `_type == ^.postType
            && !(_id in path('drafts.**'))
            && count((personas[]->option.name)[@ in $userPersonas]) > 0
            `
          )
          .order("publishedAt desc")
          .slice(0, 12)
          .grab$({
            _type: postTypes,
            title: q.string(),
            publishedAt: q.string(),
            mainImage: getImage("mainImage"),
            slug: q("slug").grabOne("current", q.string()),
          }),
      },
      "_type == 'featuredProducts'": {
        _type: q.literal("featuredProducts"),
        key: q("_key"),
        products: q("products[]", { isArray: true }).grab$({
          name: q.string(),
          link: q.string(),
          image: getImage("image"),
        }),
      },
    }),
  });

export type HomepageData = InferType<typeof getHomepage>;
export type HomepageHeroCarouselData = HomepageData["heroCarousel"];
export type HomepagePageBlocksData = HomepageData["pageBlocks"];

export type RecentPostBlockData = Extract<
  HomepagePageBlocksData[number],
  { _type: "recentPostBlock" }
>;

export type ArticleCardData = RecentPostBlockData["posts"][number];

export type FeaturedProductsData = Extract<
  HomepagePageBlocksData[number],
  { _type: "featuredProducts" }
>;

export type HomepageHeroCarouselItemData =
  HomepageHeroCarouselData[number]["article"];

export type FeaturedProductData = FeaturedProductsData["products"][number];
