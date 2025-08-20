import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/useAuthStore";
import { useGlobalModalStore } from "@/stores/useGlobalModalStore";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface TsignupData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

const signup = async (data: TsignupData) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

const logout = async () => {
  await api.post("/auth/logout");
};

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { closeModal } = useGlobalModalStore();
  return useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      setUser(data.user);
      closeModal();
      toast.success(data.message);
    },
    onError: (error) => {
      if (error && isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

export const useSignup = (callback: () => void) => {
  const router = useRouter();
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: () => {
      toast.success("User Registered Successfully");
      if (callback) callback();
    },
    onError: (error) => {
      if (error && isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
  });
};

export const useLogout = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      router.replace("/");
      setUser(null);
    },
  });
};
