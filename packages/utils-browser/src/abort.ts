export function abortAfter(timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const clear = () => clearTimeout(id);
  return { controller, signal: controller.signal, clear };
}

export default abortAfter;
