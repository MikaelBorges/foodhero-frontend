import { getPhone, loginUser, registerUser, updateUser } from "@/api/userApi";
import { useUserContext } from "@/contexts/userContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

export const useLoginUser = () => {
  const { updateUser } = useUserContext();
  const router = useRouter();

  return useMutation({
    mutationFn: async (credentials: LoginParams) => loginUser(credentials),
    onSuccess: (data) => {
      const userInfo = {
        id: data.id,
        firstname: data.firstname,
        lastname: data.lastname,
        image: data.image,
        isLogged: true,
      };
      updateUser(userInfo);
      router.push("/");
    },
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
