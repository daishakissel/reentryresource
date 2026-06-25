export type Resource = {
  id: string;
  title: string;
  slug: string;
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
  what_topic_id: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  what_topics?: { name: string } | null;
};

export type WhyCategory = {
  id: string;
  name: string;
  definition: string | null;
  slug: string;
  sort_order: number;
};

export type WhatTopic = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
};

export type WhereLocationType = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};

export type WhenTime = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};

export type HowFormat = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};

export type WhoCentering = {
  id: string;
  name: string;
  definition: string | null;
  sort_order: number;
};
