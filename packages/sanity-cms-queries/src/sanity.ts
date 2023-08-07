// import { createClient } from "@sanity/client";
import { makeSafeQueryRunner } from "groqd";

export const runQuery = makeSafeQueryRunner(
  async (query, params: Record<string, number | string>) => {
    const { createClient } = await import("@sanity/client");

    const client = createClient({
      // TODO: replace with shared sanity config
    });

    return client.fetch(query, params);
  },
);
