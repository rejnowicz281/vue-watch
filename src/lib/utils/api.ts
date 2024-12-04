import axios from "axios";
import { EXPRESS_URL } from "./config";

export const API = axios.create({
    baseURL: EXPRESS_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});
