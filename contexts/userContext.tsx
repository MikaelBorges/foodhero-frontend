"use client";
import { useContext, createContext, useState, useEffect } from "react";

type UserType = {
  id: number | null;
  firstname: string;
  lastname: string;
  image: string;
  isLogged: boolean;
};

interface UserContextProps {
  user: UserType;
  updateUser: (newDataUser: UserType) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useAppContext doit être utilisé à l'intérieur de AppProvider"
    );
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>({
    id: null,
    firstname: "",
    lastname: "",
    image: "",
    isLogged: false,
  });

  // Charger la préférence depuis le localStorage lors du chargement initial
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Mettre à jour le localStorage lorsque la préférence change
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Fonction pour basculer la préférence
  const updateUser = (newDataUser: UserType) => {
    setUser((prevUser) => ({ ...prevUser, ...newDataUser }));
  };

  // Contexte à fournir aux composants descendants
  const contextValue: UserContextProps = {
    user,
    updateUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
