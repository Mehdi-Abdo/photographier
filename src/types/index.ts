export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  featured: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  includes: string[];
  image_url: string;
  created_at: string;
}

export interface Booking {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  service_id: string | null;
  service_name: string;
  booking_date: string;
  booking_time: string;
  message: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  created_at: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
