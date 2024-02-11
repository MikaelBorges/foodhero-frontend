"use client";
import { createContext, useState, useEffect } from "react";
export type DevModeContextType = {
  devMode: boolean | null;
  setDevMode: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export type DevModeContextProviderPropsType = {
  children: React.ReactNode;
};

export const DevModeContext = createContext({
  devMode: null,
  setDevMode: (value: React.SetStateAction<boolean | null>) => {},
} as DevModeContextType);

export const DevModeContextProvider = ({
  children,
}: DevModeContextProviderPropsType) => {
  const [devMode, setDevMode] = useState<boolean | null>(null);

  useEffect(() => {
    const devModeStorage = localStorage.getItem("devModeStorage");
    if (devModeStorage) {
      const parsedUserStorage = JSON.parse(devModeStorage);
      setDevMode(parsedUserStorage);
    } else {
      // Si le localStorage ne contient pas d'utilisateur, initialisez-le avec la valeur par défaut (true dans votre cas)
      setDevMode(false);
    }
  }, []); // Exécutez l'effet uniquement au montage du composant

  useEffect(() => {
    // Stockez l'utilisateur dans le localStorage chaque fois qu'il change
    if (devMode !== null) {
      localStorage.setItem("devModeStorage", JSON.stringify(devMode));
    }
  }, [devMode]);

  return (
    <DevModeContext.Provider value={{ devMode, setDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
};
