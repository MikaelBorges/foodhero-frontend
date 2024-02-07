import { API_URL } from "@/constants/endPoints";
import { waitSeconds } from "@/lib/fetchUtils";

export const getPhone = async (userId: string) => {
  await waitSeconds(1);
  const response = await fetch(`${API_URL}/user/phone/${userId}`);
  const phone: string = await response.json();
  return phone;
};
