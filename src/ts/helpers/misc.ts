/**
 *  Misc Helpers
 */

/**
 * Parses URL into its components
 * @param  {string} url
 */
export function parseUrl(url: string) {
  let pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?")
  let matches = url.match(pattern)
  return {
    scheme: matches[2],
    authority: matches[4],
    path: matches[5],
    query: matches[7],
    fragment: matches[9]
  }
}

/**
 * @param  {Array<T>} arr - array to search
 * @param  {T} item - item to search for
 * @returns boolean - true if `item` is in `arr`
 */
export function contains<T>(arr: Array<T>, item: T): boolean {
  return arr.filter((x) => x === item).length > 0
}

/**
 * Formats and shortens a url for ui
 * @param  {string} url
 * @param  {number} maxLength - max length of shortened url
 * @returns string
 */
export function resourceUrlFormatter(url: string, maxLength: number): string {
  if (url.length < maxLength) {
    return url.replace(/https?:\/\//, "")
  }

  let matches = parseUrl(url)

  if ((matches.authority + matches.path).length < maxLength) {
    return matches.authority + matches.path
  }

  const maxAuthLength = Math.floor(maxLength / 2) - 3
  const maxPathLength = Math.floor(maxLength / 2) - 5
  // maybe we could fine tune these numbers
  let p = matches.path.split("/")
  if (matches.authority.length > maxAuthLength) {
    return matches.authority.substr(0, maxAuthLength) + "..." + p[p.length - 1].substr(-maxPathLength)
  }
  return matches.authority + "..." + p[p.length - 1].substr(-maxPathLength)
}

/**
 * Helper to add a precision to `Math.round`
 * @param  {number} num - number to round
 * @param  {number} decimals - decimal precision to round to
 */
export function roundNumber(num: number, decimals: number) {
  return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
}