import React, { createContext, useState, useContext, ReactNode } from "react";

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  [key: string]: any; // 추가 속성 허용
}

interface FavoritesContextValue {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => void;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === movie.id);
      return isFavorite
        ? prevFavorites.filter((fav) => fav.id !== movie.id)
        : [...prevFavorites, movie];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextValue => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
