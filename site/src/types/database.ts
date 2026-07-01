export type Resource = {
  id: string;
  title: string;
  slug: string;
  organization_name: string | null;
  facility_name: string | null;
  description: string | null;
  content: string | null;
  featured_image: string | null;
  street_address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  region: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  engage: string | null;
  expiration_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Element = {
  id: string;
  name: string;
  definition: string | null;
  slug: string;
  sort_order: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type Mode = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};

export type Format = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};

export type Centering = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};
