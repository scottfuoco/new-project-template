export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isObjectEmpty(object: Record<string, unknown>) {
  return Object.keys(object).length === 0 && object.constructor === Object;
}
