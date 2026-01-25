
export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string; // Directus file ID
  category: string;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date_created: string;
  image: string;
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

/**
 * Helper to fetch file URL from Directus
 */
export function getDirectusFileUrl(fileId: string) {
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
