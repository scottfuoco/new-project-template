export const isFulfilled = <T>(
  input: PromiseSettledResult<T>
): input is PromiseFulfilledResult<T> => input.status === "fulfilled";
export const isRejected = (
  input: PromiseSettledResult<unknown>
): input is PromiseRejectedResult => input.status === "rejected";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSettled<T, O, F = any>(
  promise: PromiseSettledResult<T>,
  output: (data: T) => O,
  fallback?: F
) {
  const ok = isFulfilled<T>(promise);
  if (ok) {
    return output(promise.value);
  }

  if (fallback) return fallback;

  throw new Error(promise.reason);
}
