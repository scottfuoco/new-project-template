import { Merge } from "type-fest";
import {
  SanityCheckboxFilter,
  SanityDateRangeFilter,
  SanityMultiSelectFilter,
  checkboxFilters,
  dateRangeFilters,
  getFilterNames,
  multiSelectFilters,
} from "@package/utils-shared";
import { q, InferType, sanityImage } from "groqd";

const getImage = (name: string) =>
  sanityImage(name, {
    withCrop: true,
    withHotspot: true,
    withAsset: ["base", "lqip"],
  });

const multiSelectFilterTags = getFilterNames(multiSelectFilters);
const checkboxFilterTags = getFilterNames(checkboxFilters);
const dateRangeFilterTags = getFilterNames(dateRangeFilters);

const multiSelectFilterString = `tag in ['${multiSelectFilterTags.join(
  "', '",
)}']`;

const checkboxFilterString = `tag in ['${checkboxFilterTags.join("', '")}']`;

const dateRangeFilterString = `tag in ['${dateRangeFilterTags.join("', '")}']`;

export const getSearchPage = q("*")
  .filter(`_type == "searchPage" && !(_id in path('drafts.**'))`)
  .slice(0)
  .grab$({
    title: q.string(),
    searchDescription: q.string(),
    heroImage: getImage("heroImage"),
    tags: q("tagsAndFilters", { isArray: true })
      .filter()
      .select({
        [multiSelectFilterString]: {
          type: ['"multiSelect"', q.literal("multiSelect")],
          title: q.string(),
          // Special handling for the primary and secondary tags as they both sourced from the
          // 'tags' document in sanity
          tag: q.select({
            'title == "Primary Tag"': [
              '"primaryTags"',
              q.literal("primaryTags"),
            ],
            'title == "Secondary Tag"': [
              '"secondaryTags"',
              q.literal("secondaryTags"),
            ],
            'title != "Primary Tag" && title != "Secondary Tag"': [
              "tag",
              q.string(),
            ],
          }),
          isInitiallyExpanded: q.boolean(),
          data: q("*", { isArray: true })
            .filter("_type == ^.tag")
            .grab$({
              option: q("option").grab$({
                // Matching the expected props for the mantine component
                label: ["name", q.string()],
                value: ["name", q.string()],
              }),
            }),
        },
        [checkboxFilterString]: {
          type: ['"checkbox"', q.literal("checkbox")],
          title: q.string(),
          tag: ["tag", q.string()],
          isInitiallyExpanded: q.boolean(),
          data: q("*", { isArray: true })
            .filter("_type == ^.tag")
            .grab$({
              option: q("option").grab$({
                // Matching the expected props for the mantine component
                label: ["name", q.string()],
                value: ["name", q.string()],
              }),
            }),
        },
        [dateRangeFilterString]: {
          title: q.string(),
          type: ['"dateRange"', q.literal("dateRange")],
          isInitiallyExpanded: q.boolean(),
          tag: ["tag", q.string()],
        },
        default: {
          type: ['"unsupported"', q.literal("unsupported")],
          tag: ['"unsupported"', q.literal("unsupported")],
        },
      }),
  });

export type SearchPageFilter =
  | SanityCheckboxFilter
  | SanityMultiSelectFilter
  | SanityDateRangeFilter;

export type SearchPageFilters = [
  SanityCheckboxFilter | SanityMultiSelectFilter | SanityDateRangeFilter,
];

export type SearchPageData =
  | Merge<InferType<typeof getSearchPage>, { tags: SearchPageFilters }>
  | { error: string };
