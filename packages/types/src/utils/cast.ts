/* eslint-disable security/detect-object-injection */
import type { Static, TSchema } from "../type";
import { TypeGuard, Value } from "../type";
import dayjs from "dayjs";
import { isArray, isFunction, isPrimitive } from "radash";

const noAdditionalProperties = <T extends TSchema>(schema: T): T => {
  if (TypeGuard.TUnion(schema)) {
    return {
      ...schema,
      anyOf: schema.anyOf.map((item) => noAdditionalProperties(item)),
    };
  }
  if (TypeGuard.TArray(schema)) {
    return { ...schema, items: noAdditionalProperties(schema.items) };
  }
  if (TypeGuard.TObject(schema)) {
    return {
      ...schema,
      additionalProperties: false,
      properties: Object.fromEntries(
        Object.entries(schema.properties).map(([key, value]) => [
          key,
          noAdditionalProperties(value),
        ])
      ),
    };
  }
  return schema;
};

type KeyMapTuples = Array<[string, string | undefined]>;
type KeyMap = Record<string, string>;
type InputData = unknown;

export const remapSchemaKey = <T extends TSchema>(
  schema: T,
  from: PropertyKey,
  to: PropertyKey
): T => {
  if (TypeGuard.TArray(schema)) {
    return { ...schema, items: remapSchemaKey(schema.items, from, to) };
  }
  if (TypeGuard.TObject(schema)) {
    return {
      ...schema,
      properties: Object.fromEntries(
        Object.entries(schema.properties).map(([key, value]) => [
          key === from ? to : key,
          remapSchemaKey(value, from, to),
        ])
      ),
    };
  }
  return schema;
};

const keyMapApp: KeyMapTuples = [
  ["_id", "id"],
  ["template", "details"],
  ["_created", undefined],
];
const keyMapDb = structuredClone(keyMapApp).map((k) =>
  k.reverse()
) as KeyMapTuples;

export type TagModelOptions = {
  ignoreErrors?: boolean;
  debug?: boolean;
  noAdditionalProperties?: boolean;
  cast?: boolean;
  returnRemapped?: boolean;
};
const defaultOptions: TagModelOptions = {
  ignoreErrors: false,
  debug: false,
  noAdditionalProperties: true,
  cast: false,
  returnRemapped: false,
};
export function TagModel<T extends InputData, S extends TSchema>(
  input: T extends unknown[] ? T[] : T,
  schema: S,
  options = defaultOptions
) {
  const selectedOptions = { ...defaultOptions, ...options };
  const isDbSchema = Boolean(schema.properties?._id);

  const keyMapArray = isDbSchema ? keyMapDb : keyMapApp;
  const keyMap = Object.fromEntries(keyMapArray) as KeyMap;

  const remappedData = transform(input, keyMap);
  if (selectedOptions.returnRemapped) {
    return remappedData as Static<S>;
  }

  const outputSchema = selectedOptions.noAdditionalProperties
    ? noAdditionalProperties(schema)
    : schema;

  const data = selectedOptions.cast
    ? Value.Cast(outputSchema, remappedData)
    : remappedData;

  if (!Value.Check(outputSchema, data)) {
    log.warn("Schema validation failed");
    if (selectedOptions.debug) {
      log.debug(
        JSON.stringify(
          {
            schema: typeof schema === "string" ? JSON.parse(schema) : schema,
            errors: [...Value.Errors(outputSchema, data)],
            input,
            output: data,
            isDbSchema,
            keyMap,
            options,
          },
          undefined,
          2
        )
      );
    }
    if (!selectedOptions.ignoreErrors) {
      throw new Error("Schema validation failed");
    }
  }

  return data as Static<S>;
}

function isPlainObject<Value = unknown>(
  value: unknown
): value is Record<PropertyKey, Value> {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}

function isUUIDType(value: unknown): value is Buffer | Uint8Array {
  return value instanceof Buffer || value instanceof Uint8Array;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
function transform(value: unknown, keyMap: KeyMap): unknown {
  // Return any primitive values or function/class objects
  // Transform anything that is going TO a primitive value, we do this to ensure Value.Cast works
  // if (!is.object(value)) return value;
  if (isPrimitive(value)) return value;
  if (!value || typeof value !== "object") return value;

  if (!isPlainObject(value)) {
    // Check for exact functions first ^
    if (isFunction(value)) return value;

    if (dayjs.isDayjs(value) || value instanceof Date) {
      return dayjs(value).toISOString();
    }
  }

  if (isArray(value)) {
    return value.map((v) => transform(v, keyMap));
  }

  return Object.entries(value).reduce<Record<string, unknown>>(
    (state, [key, entry]) => {
      if (keyMap.hasOwnProperty(key)) {
        const indexKey = keyMap[key];
        if (!indexKey) {
          delete state[key];
          return state;
        }
        return {
          ...state,
          [indexKey]: transform(entry, keyMap),
        };
      }
      return {
        ...state,
        [key]: transform(entry, keyMap),
      };
    },
    {}
  );
}
