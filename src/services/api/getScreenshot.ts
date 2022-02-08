import axios from "axios";
import { SCREENSHOT_BASE_URL } from "../../constants";
import { Buffer } from "buffer";

/***
 * @returns base64 encoded image
 */
export const getScreenshot = async (
    siteUrl: string,
    customerKey: string
): Promise<string> => {
    try {
        const response = await axios({
            url: SCREENSHOT_BASE_URL,
            method: "GET",
            params: {
                key: customerKey,
                url: siteUrl,
                device: "desktop",
                dimension: "1920x1080",
                format: "jpg",
            },
            responseType: "arraybuffer",
        });
        return Buffer.from(response.data, "binary").toString("base64");
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            throw error.code;
        }
        throw error;
    }
};
