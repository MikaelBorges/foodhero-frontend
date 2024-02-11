"use client";
import React, { useContext, createContext, useState, useEffect } from "react";

interface DevModeContextProps {
  devMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextProps | undefined>(
  undefined
);

export const useDevModeContext = () => {
  const context = useContext(DevModeContext);
  if (!context) {
    throw new Error(
      "useAppContext doit être utilisé à l'intérieur de AppProvider"
    );
  }
  return context;
};

interface DevModeProviderProps {
  children: React.ReactNode;
}

export const DevModeProvider: React.FC<DevModeProviderProps> = ({
  children,
}) => {
  const [devMode, setDevMode] = useState<boolean>(false);

  // Charger la préférence depuis le localStorage lors du chargement initial
  useEffect(() => {
    const savedDevMode = localStorage.getItem("devMode");
    if (savedDevMode) {
      setDevMode(JSON.parse(savedDevMode));
    }
  }, []);

  // Mettre à jour le localStorage lorsque la préférence change
  useEffect(() => {
    localStorage.setItem("devMode", JSON.stringify(devMode));
  }, [devMode]);

  // Fonction pour basculer la préférence
  const toggleDevMode = () => {
    setDevMode((prevDevMode) => !prevDevMode);
  };

  // Contexte à fournir aux composants descendants
  const contextValue: DevModeContextProps = {
    devMode,
    toggleDevMode,
  };

  return (
    <DevModeContext.Provider value={contextValue}>
      {children}
    </DevModeContext.Provider>
  );
};
