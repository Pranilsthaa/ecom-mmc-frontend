import axios, { isAxiosError } from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError(error)) {
      if (error.response?.status === 401) {
        try {
          await api.post("/auth/refresh-token");
          if (error.config) {
            return api(error.config);
          }
        } catch (refreshError) {
          if (isAxiosError(refreshError)) {
            if (refreshError.response?.status === 401) {
              toast.message("Session expired. Please log in again.");
            }
          }
        }
      }
    }
    return Promise.reject(error);
  }
);
