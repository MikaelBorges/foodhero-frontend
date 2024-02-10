import { API_URL } from "@/constants/endPoints";
import { LoginParams, UserFullParams } from "@/hooks/userHooks";
import { waitSeconds } from "@/lib/fetchUtils";

export const getPhone = async (userId: string) => {
  await waitSeconds(1);
  const response = await fetch(`${API_URL}/user/phone/${userId}`);
  const phone: string = await response.json();
  return phone;
};

export const connectUser = async (credentials: LoginParams) => {
  await waitSeconds(1);
  return {
    token: "token",
    id: "id",
    firstname: "Jane",
    lastname: "Smith",
  };
};

export const registerUser = async (credentials: UserFullParams) => {
  await waitSeconds(1);
  return {
    id: "id",
    firstname: "Jane",
    lastname: "Smith",
  };
};

export const updateUser = async (credentials: UserFullParams) => {
  await waitSeconds(1);
  return {
    id: "id",
    firstname: "Jane",
    lastname: "Smith",
  };
};
