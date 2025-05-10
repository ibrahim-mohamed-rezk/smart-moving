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
  };
  secondPart?: {
    title: string;
  };
  out_address?: ServiceInput[];
  moving_address?: ServiceInput[];
}

export interface registrationFormData {
  first_name: string;
  sur_name: string;
  email: string;
  CVR: string;
  phone: string;
  country_code: string;
  password: string;
  password_confirmation: string;
  address: string;
  postal_code: string;
  city: string;
  contact_person: string;
  services: number[];
}

export interface countryTypes {
  name: string;
  region: string;
  code?: string;
  timezones: {
    [key: string]: string;
  };
  iso: {
    "alpha-2": string;
    "alpha-3": string;
    numeric: string;
  };
  phone: string[];
  emoji: string;
  image: string;
}

export interface UserDataTypes {
  id?: number;
  name?: string;
  email: string;
  phone: string;
  provider_id?: string;
  image?: string;
  device_token?: string;
  email_verified_at?: string;
  first_name?: string;
  sur_name?: string;
  role?: string;
}

export interface TaskTypes {
    title: string;
    description: string;
    status: string;
}
