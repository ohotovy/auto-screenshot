import { FolderOpen, ScreenshotOutlined } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import { ReactComponent as ScreenshotSvg } from "../assets/img_screen.svg";
import { GOOGLE_DRIVE_SCREENSHOTS_URL, sites } from "../constants";
import { useAuth, useToast } from "../contexts/App";
import { Site } from "../interfaces/Site";
import { getScreenshot } from "../services/api/getScreenshot";
import { uploadFileToDrive } from "../services/api/uploadFileToDrive";

function Screenshot() {
    const { apiKey, getValidGoogleCredentials } = useAuth();
    const showToast = useToast();
    const [loading, setLoading] = useState<boolean>(false);
    const [site, setSite] = useState<Site>(sites[0]);

    const handleScreenshotFlow = async () => {
        setLoading(true);
        try {
            if (apiKey) {
                const screenshot = await getScreenshot(site.url, apiKey);
                const accessToken = await getValidGoogleCredentials();
                if (accessToken) {
                    await uploadFileToDrive(
                        screenshot,
                        accessToken.token,
                        site.id + "_" + site.name + ".jpg"
                    );
                    showToast(
                        "The screenshot was successfully uploaded to Google Drive!"
                    );
                } else {
                    showToast(
                        "A problem occurred. Please restart the application."
                    );
                }
            } else {
                showToast(
                    "No consumer key found. Please restart the application."
                );
            }
        } catch (error) {
            showToast("Screenshot upload failed. Please try again later.");
        }
        setLoading(false);
    };

    const handleSiteChange = (e: SelectChangeEvent) => {
        const site: Site | undefined = sites.find(
            (site) => site.id.toString() === e.target.value
        );
        if (site) {
            setSite(site);
        }
    };

    return (
        <Grid container spacing={2} pt={10} pb={10} justifyContent="center">
            <Grid item xs={6} sm={4} md={3} py={2}>
                <ScreenshotSvg width={"100%"} height={"100%"} />
            </Grid>
            <Grid item xs={12} py={4}>
                <Typography variant="h3" p={2} fontWeight="medium">
                    {"Take a screenshot!"}
                </Typography>
            </Grid>
            <Grid item xs={8}>
                <FormControl fullWidth>
                    <InputLabel id="select-label">Website</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        label="Website"
                        value={site.id.toString()}
                        onChange={(e) => handleSiteChange(e)}
                    >
                        {sites.map((site) => (
                            <MenuItem key={site.id} value={site.id.toString()}>
                                {site.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item my={5} xs={12}>
                <LoadingButton
                    variant="contained"
                    size="large"
                    loading={loading}
                    endIcon={<ScreenshotOutlined />}
                    onClick={() => handleScreenshotFlow()}
                >
                    Save screenshot
                </LoadingButton>
            </Grid>
            <Grid item xs={12}>
                <LoadingButton
                    variant="outlined"
                    size="large"
                    endIcon={<FolderOpen />}
                    onClick={() =>
                        window.open(GOOGLE_DRIVE_SCREENSHOTS_URL, "_blank")
                    }
                >
                    Open Google Drive
                </LoadingButton>
            </Grid>
        </Grid>
    );
}

export default Screenshot;
