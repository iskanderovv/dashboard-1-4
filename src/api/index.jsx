import axios from "axios";
import store from "../redux/store";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        "Content-Type" : "application/json",
        "Authorization": `Bearer ${store.getState().token}`,
    },
    timeout: 10000
})

export default apiInstance