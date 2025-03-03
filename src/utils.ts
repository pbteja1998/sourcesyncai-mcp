/**
 * Convert a string to lowercase kebab-case
 * Example: "HelloWorld" -> "hello-world"
 */
export function toLowerKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase()
}
