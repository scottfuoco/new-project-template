import sensible from "@fastify/sensible";
import { fastify as fastifyInstance, FastifyServerOptions } from "fastify";

export const createApp = async (options?: FastifyServerOptions) => {
  const app = await fastifyInstance({
    maxParamLength: 5000,
    disableRequestLogging: true,
    ...options,
  });

  // await app.register(sensible);

  return app;
};
