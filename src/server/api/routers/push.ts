import { exec } from "child_process";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const pushRouter = createTRPCRouter({
  db: publicProcedure.query(() => {
    exec("pnpm db:push", (_, stdout) => console.log(stdout));
  }),
});
