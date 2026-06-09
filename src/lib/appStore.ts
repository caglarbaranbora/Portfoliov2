// App Store data layer — iTunes Lookup API (free, no key).
// Fetches published app metadata by numeric App Store id.

export interface AppStoreApp {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  url: string;
  genre: string;
  price: string;
  version: string;
  rating: number;
  ratingCount: number;
  releaseDate: string;
  screenshots: string[];
}

// Numeric App Store ids of published apps to feature on the work page.
export const APP_STORE_IDS: string[] = ["6753074763"];

interface ITunesResult {
  trackId: number;
  trackName: string;
  description: string;
  artworkUrl512?: string;
  artworkUrl100?: string;
  trackViewUrl: string;
  primaryGenreName: string;
  formattedPrice?: string;
  version: string;
  averageUserRating?: number;
  userRatingCount?: number;
  releaseDate: string;
  screenshotUrls?: string[];
}

function firstSentence(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  const dot = clean.indexOf(". ");
  const cut = dot > 0 ? clean.slice(0, dot + 1) : clean;
  return cut.length > 140 ? cut.slice(0, 137).trimEnd() + "…" : cut;
}

function normalize(r: ITunesResult): AppStoreApp {
  return {
    id: String(r.trackId),
    name: r.trackName,
    tagline: firstSentence(r.description),
    description: r.description.replace(/\s+/g, " ").trim(),
    icon: r.artworkUrl512 || r.artworkUrl100 || "",
    url: r.trackViewUrl.split("?")[0],
    genre: r.primaryGenreName,
    price: r.formattedPrice || "",
    version: r.version,
    rating: r.averageUserRating || 0,
    ratingCount: r.userRatingCount || 0,
    releaseDate: r.releaseDate,
    screenshots: r.screenshotUrls || [],
  };
}

// Fetch a single app by id. Cached 24h via Next fetch revalidate.
export async function fetchApp(id: string): Promise<AppStoreApp | null> {
  try {
    const res = await fetch(
      `https://itunes.apple.com/lookup?id=${encodeURIComponent(id)}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      resultCount: number;
      results: ITunesResult[];
    };
    if (!data.resultCount) return null;
    return normalize(data.results[0]);
  } catch {
    return null;
  }
}

// Fetch all configured apps; drops any that fail to load.
export async function fetchApps(
  ids: string[] = APP_STORE_IDS
): Promise<AppStoreApp[]> {
  const results = await Promise.all(ids.map(fetchApp));
  return results.filter((a): a is AppStoreApp => a !== null);
}
