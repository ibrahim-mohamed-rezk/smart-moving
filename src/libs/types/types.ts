export interface ServiceTypes {
  id: number;
  type: number;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export interface ReviewTypes {
  id: number;
  company: string;
  user: string;
  service: string;
  rating: number;
  review: string;
}

export interface CompanyTypes {
  id: number;
  image: string;
  name: string;
  email: string;
  phone: string;
  cvr: string;
  contact_person: string;
  address: string;
  city: string;
  postal_code: string;
  telephone: string;
  mobile_phone: string;
  possible_website: string;
  services: ServiceTypes[];
  reviews: ReviewTypes[];
}

export interface ServiceInput {
  title: string;
  name: string;
  type: string;
  options?: { title: string; value: string }[];
}

export interface ServiceFormData {
  isDivided: boolean;
  firstPart?: {
    title: string;
  },
  secondPart?: {
    title: string;
  }
  out_address?: ServiceInput[];
  moving_address?: ServiceInput[];
}