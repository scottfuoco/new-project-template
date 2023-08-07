import type { Opaque, UnwrapOpaque } from "type-fest";

export type IsOpaque<T> = T extends Opaque<infer Type, unknown> ? Type : never;
export type UnwrapType<T> = T extends Opaque<unknown> ? UnwrapOpaque<T> : T;

export type Unwrap<T> = T extends IsOpaque<T>
  ? UnwrapType<T>
  : T extends object
  ? {
      [K in keyof T]: T[K] extends IsOpaque<T[K]>
        ? UnwrapType<T[K]>
        : T[K] extends object
        ? Unwrap<T[K]>
        : UnwrapType<T[K]>;
    }
  : UnwrapType<T>;

export type ReplaceValues<T, U, C> = {
  [K in keyof T]: T[K] extends U ? C : T[K];
};

export type ReplaceValuesDeep<T, U, C> = T extends object
  ? {
      [K in keyof T]: T[K] extends U
        ? C
        : T[K] extends IsOpaque<T[K]>
        ? T[K]
        : T[K] extends object
        ? ReplaceValuesDeep<T[K], U, C>
        : T[K];
    }
  : T;
