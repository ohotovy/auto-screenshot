import axios from "axios";
import { REFRESH_TOKEN_URL } from "../../constants";
import { Token } from "../../interfaces/Token";

export const getAccessToken = async (): Promise<Token> => {
    try {
        const response = await axios({
            url: REFRESH_TOKEN_URL,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            params: {
                grant_type: "refresh_token",
                client_id: process.env.REACT_APP_CLIENT_ID,
                client_secret: process.env.REACT_APP_CLIENT_SECRET,
                refresh_token: process.env.REACT_APP_REFRESH_TOKEN,
            },
        });

        const accessToken: Token = {
            token: response.data.access_token,
            expiresAtMs: response.data.expires_in + Date.now(),
        };
        return accessToken;
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            throw error.code;
        }
        throw error;
    }
};
