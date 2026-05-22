import { AuthUser } from '../types';

const AUTH_STORAGE_KEY = 'airbnb_user';
const FAVORITES_STORAGE_KEY = 'airbnb_favorites';

export const authUtils = {
  // Save user to localStorage
  saveUser: (user: AuthUser) => {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  },

  // Get user from localStorage
  getUser: (): AuthUser | null => {
    const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  },

  // Remove user from localStorage
  removeUser: () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  },

  // Check if user is logged in
  isLoggedIn: (): boolean => {
    return authUtils.getUser() !== null;
  },

  // Save favorites to localStorage
  saveFavorites: (favorites: string[]) => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  },

  // Get favorites from localStorage
  getFavorites: (): string[] => {
    const favoritesStr = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (favoritesStr) {
      try {
        return JSON.parse(favoritesStr);
      } catch (error) {
        console.error('Error parsing favorites data:', error);
        return [];
      }
    }
    return [];
  },

  // Add property to favorites
  addToFavorites: (propertyId: string) => {
    const favorites = authUtils.getFavorites();
    if (!favorites.includes(propertyId)) {
      favorites.push(propertyId);
      authUtils.saveFavorites(favorites);
    }
  },

  // Remove property from favorites
  removeFromFavorites: (propertyId: string) => {
    const favorites = authUtils.getFavorites();
    const updatedFavorites = favorites.filter(id => id !== propertyId);
    authUtils.saveFavorites(updatedFavorites);
  },

  // Check if property is favorite
  isFavorite: (propertyId: string): boolean => {
    const favorites = authUtils.getFavorites();
    return favorites.includes(propertyId);
  }
};