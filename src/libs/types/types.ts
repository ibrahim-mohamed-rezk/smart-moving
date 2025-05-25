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
  user_id?: number;
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
  bio: string;
  price_listings: string;
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
  bio?: string;
  price_listings?: string;
  company?: CompanyTypes;
  verified_phone?: string;
  user_id?: number;
}

export interface TaskTypes {
  status: string;
  id: number;
  user_id: number;
  company_id?: number;
  service_id?: number;
  details: TaskDetailsTypes;
  offers?: OfferTypes[];
  created_at?: string;
  updated_at?: string;
  image?: string;
}

export interface TaskDetailsTypes {
  description: string;
  FRA_address?: string;
  moving_out_address?: string;
  service_level?: string;
  the_topic_is_moved_OFF?: string;
  the_topic_is_moved_TO?: string;
  title?: string;
  to_address?: string;
  what_needs_to_be_moved?: string;
  when_do_want_begin?: string;
  square_meters?: number;
  Address_possibly_floor?: string;
  elevator?: string;
  furnishing?: string;
  moving_address?: MovingAddressTypes;
  [key: string]: string | undefined | number | MovingAddressTypes;
}

export interface MovingAddressTypes {
    to_address?: string;
    Address_possibly_floor?: string;
    elevator?: string;
    service_level?: string;
    [key: string]: string | undefined;
  }

export interface OfferTypes {
  id: number;
  offer: string;
  status: "hold" | "accept" | "refuse";
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  company?: CompanyTypes;
  price?: string;
  message?: string;
}

export interface ChatTypes {
  id: number;
  created_by: number;
  name: string;
  is_private: number;
  image: string;
  created_at: string;
  updated_at: string;
  unread_messages_count: number;
  last_message?: MessageTypes;
  message_count: number;
  participants: {
    id: number;
    chat_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    user: UserDataTypes;
  }[];
}

export interface MessageTypes {
  id: number;
  chat_id: number;
  user_id: number;
  message: string;
  read_at: string | null;
  created_at: string;
  updated_at: string;
  user: UserDataTypes;
}
