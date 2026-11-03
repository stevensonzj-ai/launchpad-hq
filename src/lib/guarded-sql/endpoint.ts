/**
 * Extract the Neon compute endpoint ID from a connection string without ever
 * returning the user, password or full hostname: first hostname label, minus a
 * trailing "-pooler".
 */
export function parseEndpointId(connectionString: string): string | null {
  let hostname: string;
  try {
    hostname = new URL(connectionString).hostname;
  } catch {
    return null;
  }
  if (!hostname) return null;
  const first = hostname.toLowerCase().split(".")[0] ?? "";
  const id = first.endsWith("-pooler") ? first.slice(0, -"-pooler".length) : first;
  return id.length > 0 ? id : null;
}
