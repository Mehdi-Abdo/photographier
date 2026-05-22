import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { GalleryImage, Service } from '../types';

interface AppContextType {
  images: GalleryImage[];
  services: Service[];
  imagesLoading: boolean;
  servicesLoading: boolean;
  refetchImages: () => void;
  refetchServices: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [imagesLoading, setImagesLoading] = useState(true);
  const [servicesLoading, setServicesLoading] = useState(true);

  async function fetchImages() {
    setImagesLoading(true);
    const { data } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
    setImages(data ?? []);
    setImagesLoading(false);
  }

  async function fetchServices() {
    setServicesLoading(true);
    const { data } = await supabase.from('services').select('*').order('price', { ascending: true });
    setServices(data ?? []);
    setServicesLoading(false);
  }

  useEffect(() => {
    fetchImages();
    fetchServices();
  }, []);

  return (
    <AppContext.Provider value={{
      images,
      services,
      imagesLoading,
      servicesLoading,
      refetchImages: fetchImages,
      refetchServices: fetchServices,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
