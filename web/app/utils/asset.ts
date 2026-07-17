// ponytail: baseURL is static per-deploy, no need to memoize
export function asset(path: string) {
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '')
  return `${base}${path}`
}
