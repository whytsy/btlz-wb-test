import env from "#config/env/env.js";
import axios from "axios";

const WB_API_BASE_URL = "https://common-api.wildberries.ru";

const wbApi = axios.create({
    baseURL: WB_API_BASE_URL,
    headers: { Authorization: env.WB_API_KEY },
});

export default wbApi;
