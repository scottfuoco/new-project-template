import type { FastifyInstance } from "fastify";
import fastifyPlugin from "fastify-plugin";
import type { IParseOptions } from "qs";
import qs from "qs";
import { PluginOptions } from "../../types";

/** Taken from https://github.com/vanodevium/fastify-qs with types added */

export interface QsPluginOptions extends IParseOptions {
  disabled?: boolean;
}

const plugin = (
  {fastify, options, next}: {fastify: FastifyInstance, options: QsPluginOptions, next: CallableFunction}
) => {
  fastify.addHook("onRequest", (request, reply, done) => {
    if (options && options.disabled) {
      return done();
    }
    const url = request.raw.url?.replace(/\?{2,}/, "?");
    if (!url) return done();

    const querySymbolIndex = url.indexOf("?");
    const query =
      querySymbolIndex === -1 ? "" : url.slice(querySymbolIndex + 1);
    request.query = qs.parse(query, options);
    done();
  });
  next();
};

type QsPlugin = {
  fastify: FastifyInstance,
  options: QsPluginOptions,
  next: CallableFunction
};

export const pluginQs = ({pluginName, fastifyVersion = "4.x", config}: PluginOptions<QsPlugin>) => fastifyPlugin(() => plugin(config), {
  name: pluginName,
  fastify: fastifyVersion,
});
