import axios from "axios";
import {
    GOOGLE_DRIVE_FOLDER_ID,
    GOOGLE_DRIVE_UPLOAD_URL,
} from "../../constants";
import { Buffer } from "buffer";

export const uploadFileToDrive = async (
    base64Content: string,
    accessToken: string,
    fileName?: string
) => {
    try {
        const fileMetadata = {
            name: fileName ? fileName : Date.now().toString(),
            parents: [GOOGLE_DRIVE_FOLDER_ID],
        };
        const data = new FormData();
        data.append(
            "metadata",
            new Blob([JSON.stringify(fileMetadata)], {
                type: "application/json",
            })
        );
        data.append("file", new Blob([Buffer.from(base64Content, "base64")]));
        await axios({
            url: GOOGLE_DRIVE_UPLOAD_URL,
            method: "POST",
            headers: {
                Authorization: "Bearer " + accessToken,
            },
            data: data,
        });
    } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
            throw error.code;
        }
        throw error;
    }
};
