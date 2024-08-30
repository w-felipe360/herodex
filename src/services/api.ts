import axios from "axios";
import md5 from "md5";

const baseUrl = 'https://gateway.marvel.com/v1/public';
const publicKey = process.env.PUBLIC_KEY!;
const privateKey = process.env.PRIVATE_KEY!;
const ts = Number(new Date());
const hash = md5(ts + privateKey + publicKey);

const api = axios.create({
    baseURL: baseUrl,
    params: {
        ts,
        apikey: publicKey,
        hash,
    }
});

export default api;