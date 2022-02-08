import { Site } from "../interfaces/Site";

export const SCREENSHOT_BASE_URL = "https://api.screenshotmachine.com";
export const REFRESH_TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
export const GOOGLE_DRIVE_URL = "https://www.googleapis.com/drive/v3/files";
export const GOOGLE_DRIVE_SCREENSHOTS_URL =
    "https://drive.google.com/drive/folders/13kryWwIY-Kdl5ILZ7i83azHi99qtijaD?usp=sharing";

export const sites: Site[] = [
    {
        id: 1,
        name: "iFunded",
        url: "https://ifunded.de/en/",
    },
    {
        id: 2,
        name: "Property Partner",
        url: "https://www.propertypartner.co",
    },
    {
        id: 3,
        name: "Property Moose",
        url: "https://propertymoose.co.uk",
    },
    {
        id: 4,
        name: "Homegrown",
        url: "https://www.homegrown.co.uk",
    },
    {
        id: 5,
        name: "Realty Mogul",
        url: "https://www.realtymogul.com",
    },
];
