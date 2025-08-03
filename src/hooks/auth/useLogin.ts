import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const login = async(data: { email: string; password: string }) => {
    const res = await api.post('/login', data)
    return res.data;
}

export const useLogin = () => {
    const router = useRouter()
    return useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onSuccess: (data) => {
            toast.success(data.message);
            router.push('/')
        },
        onError: (error) => {
            if(error && isAxiosError(error)){
                toast.error(error.response?.data.message || "Login failed");
            }
        }
    });
}
