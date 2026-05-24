/**
 * Helper utility to perform fetch requests with automatic retries on network failures
 * or server errors, implementing exponential backoff.
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit,
  retries = 3,
  backoff = 500
): Promise<Response> {
  try {
    const res = await fetch(url, options);
    
    // If the server returns a 5xx status (e.g., 502, 503, 504), retry.
    // Do not retry on 4xx errors (client errors like 400 Bad Request or 401 Unauthorized).
    if (res.status >= 500 && retries > 0) {
      console.warn(`[fetchWithRetry] Status ${res.status}. Retrying in ${backoff}ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    
    return res;
  } catch (err) {
    if (retries > 0) {
      console.warn(`[fetchWithRetry] Network error: ${err instanceof Error ? err.message : err}. Retrying in ${backoff}ms... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw err;
  }
}
