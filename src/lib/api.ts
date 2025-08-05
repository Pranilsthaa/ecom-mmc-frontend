import axios, { isAxiosError } from "axios";

export const api = axios.create({
    baseURL: 'http://192.168.1.133:5000/',
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if(isAxiosError(error)){
            if(error.response?.status === 401){
                try{
                    await api.post('/auth/refresh-token');
                    if (error.config) {
                        return api(error.config);
                    }
                }catch(refreshError){
                    if(isAxiosError(refreshError)){
                        if(refreshError.response?.status === 401){
                            window.location.href = '/login';
                        }
                    }
                }
            }
        }
        return Promise.reject(error);
    }
);