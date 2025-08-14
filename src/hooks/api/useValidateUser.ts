import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const checkUser = async () => {
    const res = await api.get("/auth/me");
    return res.data;
  };

export const useValidateUser = () => {
  return useQuery({
    queryKey: ['validateUser'], 
    queryFn: checkUser,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false
  });
};