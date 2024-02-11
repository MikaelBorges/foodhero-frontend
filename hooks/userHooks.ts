import { getPhone, connectUser, registerUser, updateUser } from "@/api/userApi";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetPhoneById = (userId: string) =>
  useQuery({
    enabled: Boolean(userId),
    queryFn: () => getPhone(userId),
    queryKey: ["phone", userId],
  });

export type LoginParams = {
  email: string;
  password: string;
};

export const useConnectUser = () => {
  return useMutation({
    mutationFn: async (credentials: LoginParams) => connectUser(credentials),
  });
};

export type UserFullParams = {
  firstname: string;
  lastname: string;
  phone: string;
  email: string;
  password: string;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (credentials: UserFullParams) =>
      registerUser(credentials),
  });
};

export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (credentials: UserFullParams) => updateUser(credentials),
  });
};
