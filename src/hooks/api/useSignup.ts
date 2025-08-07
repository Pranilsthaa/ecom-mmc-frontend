import { api } from "@/lib/api"
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export interface TsignupData {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
}

const signup = async (data: TsignupData) => {
    const res = await api.post('/auth/signup', data)
    return res.data;
}

export const useSignup = () => {
    const router = useRouter();
    return (
    useMutation({
        mutationKey: ['signup'],
        mutationFn: signup,
        onSuccess: () => {
            toast.success('User Registered Successfully')
            router.push('login')
        },
        onError: (error) => {
            if (error && isAxiosError(error)) {
                toast.error(error.response?.data.message)
            }
        }
        })
    )
}