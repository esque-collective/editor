import { createTRPCRouter } from "@/server/api/trpc";
import { pushRouter } from "./routers/push";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  push: pushRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
