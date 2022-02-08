import axios from "axios";
import { GOOGLE_DRIVE_URL } from "../../constants";
import { Buffer } from "buffer";

export const uploadFileToDrive = async (
    base64Content: string,
    accessToken: string,
    fileName?: string
) => {
    try {
        // const drive_url = "https://www.googleapis.com/drive/v3/files";
        // let drive_request = {
        //     method: "GET",
        //     headers: {
        //         Authorization: "Bearer " + accessToken,
        //     },
        // };
        // fetch(drive_url, drive_request)
        //     .then((response) => {
        //         return response.json();
        //     })
        //     .then((list) => {
        //         console.log(list);
        //     });

        const fileMetadata = {
            name: fileName ? fileName : Date.now().toString(),
            parents: ["13kryWwIY-Kdl5ILZ7i83azHi99qtijaD"],
        };
        const data = new FormData();
        data.append(
            "metadata",
            new Blob([JSON.stringify(fileMetadata)], {
                type: "application/json",
            })
        );
        data.append("file", new Blob([Buffer.from(base64Content, "base64")]));
        fetch(
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            {
                method: "POST",
                headers: new Headers({
                    Authorization: "Bearer " + accessToken,
                }),
                body: data,
            }
        )
            .then((res) => res.json())
            .then((res) => console.log(res));

        // const response = await axios({
        //     url: GOOGLE_DRIVE_URL,
        //     method: "POST",
        //     headers: {
        //         Authorization: "Bearer " + accessToken,
        //     },
        // });
    } catch (error) {
        console.error(error);
    }
};
