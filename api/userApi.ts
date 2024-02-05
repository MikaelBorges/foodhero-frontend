import { API_URL } from "@/constants/endPoints";

export const getPhone = async (userId: string) => {
  const response = await fetch(`${API_URL}/user/phone/${userId}`);
  const phone: string = await response.json();
  return phone;
};
