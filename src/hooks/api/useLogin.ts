import { api } from "@/lib/api"
import { useAuthStore } from "@/stores/useAuthStore";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const login = async(data: { email: string; password: string }) => {
    const res = await api.post('/auth/login', data)
    return res.data;
}

export const useLogin = () => {
    const router = useRouter();
    const { setUser } = useAuthStore();
    return useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            setUser(data.user);
            toast.success(data.message);
            router.push('/')
        },
        onError: (error) => {
            if(error && isAxiosError(error)){
                toast.error(error.response?.data.message);
            }
        }
    });
}
