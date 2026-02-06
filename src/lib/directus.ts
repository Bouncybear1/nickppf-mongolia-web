


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
  subcategory_id: number;
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
  topic?: any; // Temporarily loose typing to handle potential polymorphic structure { key: Model, collection: string }
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

export interface about_us_content {
  id: number;
  company_description: string;
  mission_statement: string;
  value: string;
  highlight_title: string;
  highlight_description: string;
  highlight_image: string;
  highlight_title_2: string;
  highlight_description_2: string;
  highlight_image_2: string;
  highlight_title_3: string;
  highlight_description_3: string;
  highlight_image_3: string;
  company_image: string;
}

export interface Award {
  id: number;
  status: string;
  sort: number | null;
  title: string;
  image: string;
}

export interface Certificate {
  id: number;
  status: string;
  sort: number | null;
  title: string;
  image: string | null;
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

  let endpoint = `/items/${collection}`;
  if (collection === 'users' || collection === 'directus_users') endpoint = '/users';
  if (collection === 'roles' || collection === 'directus_roles') endpoint = '/roles';
  if (collection === 'files' || collection === 'directus_files') endpoint = '/files';

  const url = new URL(`${DIRECTUS_URL}${endpoint}`);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });
  }

  const makeRequest = async (token?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url.toString(), {
      next: { revalidate: 60 },
      headers
    });
  };

  try {
    let res = await makeRequest(process.env.DIRECTUS_API_TOKEN);

    // If unauthorized/forbidden and we used a token, retry without token (public access)
    if ((res.status === 401 || res.status === 403) && process.env.DIRECTUS_API_TOKEN) {
      console.warn(`Directus Fetch [${collection}] rejected with token (${res.status}). Retrying without token...`);
      res = await makeRequest(undefined);
    }

    if (!res.ok) {
      const text = await res.text();
      // Only log as error if it's not a 404/403 that we expect might happen
      console.error(`Directus Fetch Failed [${collection}]: ${res.status} ${res.statusText}`, text);
      throw new Error(`Failed to fetch ${collection}: ${res.status} ${text}`);
    }

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
/**
 * Create an item in Directus
 */
export async function createDirectusItem(collection: string, data: any) {
  const DIRECTUS_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055';
  const DIRECTUS_TOKEN = process.env.DIRECTUS_API_TOKEN; // Ensure this is set in .env.local

  if (!DIRECTUS_TOKEN) {
    console.error("Directus API Token is missing");
    throw new Error("Server configuration error");
  }

  try {
    let endpoint = `/items/${collection}`;
    if (collection === 'users' || collection === 'directus_users') endpoint = '/users';
    if (collection === 'roles' || collection === 'directus_roles') endpoint = '/roles';
    if (collection === 'files' || collection === 'directus_files') endpoint = '/files';

    const res = await fetch(`${DIRECTUS_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DIRECTUS_TOKEN}`
      },
      body: JSON.stringify(data)
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to create item in ${collection}: ${JSON.stringify(errorData)}`);
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error('Directus Create Error:', error);
    throw error;
  }
}
