import authService from "@/services/auth-service";
import { authStore } from "@/store/auth";
import axios, { type AxiosInstance } from "axios";
import { EXPRESS_URL } from "./config";

export const noAuthAPI = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

export const API = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

const requestInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.request.use(
        (config) => {
            if (authStore.accessToken) config.headers["Authorization"] = "Bearer " + authStore.accessToken;

            return config;
        },
        (error) => {
            Promise.reject(error);
        }
    );
};

const responseInterceptor = (instance: AxiosInstance) => {
    instance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const prevRequest = error?.config;
            if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                prevRequest.sent = true;

                const response = await authService.refresh();

                if (response.status === 200) {
                    // refresh token is still valid, retry the request with the new access token

                    prevRequest.headers["Authorization"] = "Bearer " + response.data.accessToken;

                    authStore.validateToken(response.data.accessToken);

                    return instance(prevRequest);
                } else {
                    // refresh token is invalid, log out
                    authStore.logout();
                }
            }
            return Promise.reject(error);
        }
    );
};

export const setupInterceptors = (instance: AxiosInstance) => {
    requestInterceptor(instance);
    responseInterceptor(instance);
};

export const clearInterceptors = (instance: AxiosInstance) => {
    instance.interceptors.request.clear();
    instance.interceptors.response.clear();
};
