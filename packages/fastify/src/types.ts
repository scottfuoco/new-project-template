export type config = {
  serverName: string;
  port: number;
}

export type PluginOptions<T> = {
  pluginName: string;
  fastifyVersion: string;
  config: T;
}

export type plugins = {
  cors: {
    enabled?: boolean;
  },
  helmet: {
    enabled?: boolean;
  },
  qs: {
    enabled?: boolean;
  },
  sensible: {
    enabled?: boolean;
  },
}