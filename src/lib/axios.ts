import Axios from "axios";

const api = Axios.create({
    baseURL: `/api`,
    headers: {
        "Content-type": "application/json",
    },
});
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export { api };
