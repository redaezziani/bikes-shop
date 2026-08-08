import { unstable_cache } from 'next/cache';
import { getPlaiceholder } from 'plaiceholder';

// Blur placeholders never change for a given image URL, so cache them for a long time.
const BLUR_CACHE_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

const computeBlur = async (url: string): Promise<string | undefined> => {
  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const buffer = Buffer.from(await res.arrayBuffer());
    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch {
    return undefined;
  }
};

/**
 * Returns a cached base64 blur placeholder for an image URL.
 * Computed once per URL and reused across requests/deployments via the Next.js Data Cache.
 */
export const getCachedBlurDataURL = (url: string): Promise<string | undefined> =>
  unstable_cache(() => computeBlur(url), ['image-blur', url], {
    revalidate: BLUR_CACHE_TTL_SECONDS,
  })();
