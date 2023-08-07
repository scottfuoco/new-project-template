import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  getHomepage: protectedProcedure.query(async ({ ctx }) => {
    try {
      return { success: true };
    } catch (error) {
      return {
        error: "Failed to fetch homepage data",
      };
    }
  }),
});
