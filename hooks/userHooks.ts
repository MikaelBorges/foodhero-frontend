import { useQuery } from "@tanstack/react-query";
import { getPhone } from "@/api/userApi";

export const useGetPhoneById = (userId: string) =>
  useQuery({
    enabled: Boolean(userId),
    queryFn: () => getPhone(userId),
    queryKey: ["phone", userId],
  });
