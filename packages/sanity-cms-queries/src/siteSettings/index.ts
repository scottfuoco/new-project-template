import { InferType, q, sanityImage } from "groqd";

const getImage = (name: string) =>
  sanityImage(name, {
    withCrop: true,
    withHotspot: true,
    withAsset: ["base", "lqip"],
  });

export const getSiteSettings = q("*")
  .filterByType(`siteSettings`)
  .filter(`!(_id in path('drafts.**'))`)
  .slice(0)
  .grab$({
    socialLinks: q("socialLinks[]", { isArray: true }),
    logo: getImage("logo"),
    footer: q("*")
      .filterByType(`footer`)
      .filter(`!(_id in path('drafts.**'))`)
      .slice(0)
      .grab$({
        copyright: q.string(),
        contacts: q("contacts"),
        contactsLinks: q("contactsLinks", { isArray: true }),
        linksGroupsList: q("linksGroupsList"),
        policyLinks: q("policyLinks"),
        extraLinks: q("extraLinks"),
      }),
    navigation: q("*")
      .filterByType(`navigation`)
      .filter(`!(_id in path('drafts.**'))`)
      .slice(0)
      .grab$({
        links: q("links", { isArray: true }),
      }),
  });

export type SiteSettingsData = InferType<typeof getSiteSettings>;
