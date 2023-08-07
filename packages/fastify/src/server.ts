import { createApp } from "./app";
import { config } from "./config/config";
import { envVars } from "./config/env";
import { appRouter } from "./routes/trpc";
import { createContext } from "./routes/trpc/context";
import type { FastifyCorsOptions } from "@fastify/cors";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";

async function main() {
  const app = await createApp({
    logger: config[envVars.NODE_ENV].logger,
  });

  await app.register(fastifyTRPCPlugin, {
    prefix: "/trpc",
    trpcOptions: { router: appRouter, createContext },
  });

  if (envVars.NODE_ENV === "development") {
    await import("trpc-playground/handlers/fastify").then(async (module) => {
      const trpcPlaygroundPlugin = await module.getFastifyPlugin({
        trpcApiEndpoint: "/trpc",
        playgroundEndpoint: "/playground/trpc",
        router: appRouter,
        request: {
          superjson: true,
        },
      });
      await app.register(trpcPlaygroundPlugin, {
        prefix: "/playground/trpc",
      });
    });
  }

  await app.register<FastifyCorsOptions>(import("@fastify/cors"), {
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
    origin: true,
  });

  // await app.register(helmet, {
  //   contentSecurityPolicy: true,
  //   crossOriginEmbedderPolicy: true,
  // });

  if (envVars.HOST) {
    app.listen(
      {
        port: envVars.PORT,
        host: envVars.HOST,
      },
      (error, _address) => {
        if (error) {
          app.log.error(error);
          throw error;
        }
      }
    );
  } else {
    app.listen(
      {
        port: envVars.PORT,
      },
      (error, _address) => {
        if (error) {
          app.log.error(error);
          throw error;
        }
      }
    );
  }
}
main();

export type AppRouter = typeof appRouter;
