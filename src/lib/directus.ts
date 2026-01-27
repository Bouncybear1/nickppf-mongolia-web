
export interface Categories {
  id: number;
  Title: string;
  slug: string;
  short_description: string;
  Featured_image: string;
}

export interface ProductFiles {
  id: number;
  Products_id: number;
  directus_files_id: string; // UUID
}

export interface Product {
  id: number;
  Title: string;
  slug: string;
  description: string;
  Featured_image: number[] | ProductFiles[]; // Directus file ID or Expanded Object
  sub_category: number;
}

export interface SubCategories {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  featured_image: string;
  category_id: number;
}

export interface Featured_product {
  id: number;
  featured_product: number;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date_created: string;
  Featured_image: string;
}

export interface SiteSettings {
  id: number;
  site_name: string;
  logo: string;
  contact_email: string;
  contact_phone: string;
  address: string;
}

export interface Testimonial {
  id: number;
  client_name: string;
  content: string;
  rating: number;
}

export interface Featured_news {
  id: number;
  News_to_feature: number;
}

/**
 * Helper to fetch file URL from Directus
 */
export function getDirectusFileUrl(fileId: string | number) {
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
  return `${DIRECTUS_URL}/assets/${fileId}`;
}

/**
 * Fetch data from Directus (or Proxy)
 */
export async function fetchDirectus(collection: string, query?: Record<string, string>) {
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
  // If using a proxy, change this to your internal API route
  // const BASE_URL = '/api/directus'; 

  // For now, simpler direct fetch from client or server component
  // In production, you might want to proxy to hide tokens if reading private data
  // But public data is fine.

  const url = new URL(`${DIRECTUS_URL}/items/${collection}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 }, // Cache for 60s
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) throw new Error(`Failed to fetch ${collection}`);

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Directus Fetch Error:', error);
    return [];
  }
}
/**
 * Fetch aggregation data from Directus (e.g. count)
 */
export async function fetchDirectusCount(collection: string) {
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
  const url = new URL(`${DIRECTUS_URL}/items/${collection}`);
  url.searchParams.append('aggregate[count]', '*');

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) throw new Error(`Failed to fetch count for ${collection}`);
    const json = await res.json();
    // Directus returns data as array of aggregations.
    // e.g. [{ count: 5 }] or [{ count: "5" }] depending on version
    return Number(json.data[0]?.count) || 0;
  } catch (error) {
    console.error('Directus Count Fetch Error:', error);
    return 0;
  }
}
