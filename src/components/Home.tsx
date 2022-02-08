import { ArrowForward } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ScreenshotSvg } from "../assets/img_screen.svg";
import { useAuth, useToast } from "../contexts/App";
import { Path } from "../enums/Paths";

const Home = () => {
    const navigate = useNavigate();

    const { saveApiKey } = useAuth();

    const [apiKey, setApiKey] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const showToast = useToast();

    const handleApiKeySave = async () => {
        if (apiKey) {
            if (apiKey.length !== 6) {
                showToast("Please check your API key!");
                setError(true);
            }
            setLoading(true);
            const saved = await saveApiKey(apiKey);
            if (saved) {
                showToast("Customer key saved!");
                setTimeout(() => {
                    setLoading(false);
                    navigate(Path.SCREENSHOT, { replace: true });
                }, 1000);
            } else {
                showToast("Couldn't save the key. Please, try again later.");
            }
        } else {
            showToast("Please paste in your API key!");
            setError(true);
        }
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setApiKey(e.target.value);
            setError(false);
        } else {
            setApiKey("");
        }
    };

    return (
        <Grid container spacing={2} pt={10} pb={10} justifyContent="center">
            <Grid item xs={6} sm={4} md={3} py={2}>
                <ScreenshotSvg width={"100%"} height={"100%"} />
            </Grid>
            <Grid item xs={12} py={4}>
                <Typography variant="h3" p={2} fontWeight="medium">
                    {"Welcome to Autoshot!"}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1" fontWeight="light">
                    {"First, please paste in your customer key from "}
                    <Link
                        href="https://www.screenshotmachine.com/"
                        target="blank"
                        underline="hover"
                        rel="noreferrer"
                    >
                        {"Screenshotmachine"}
                    </Link>
                    {"."}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={8} md={6} my={4}>
                <TextField
                    variant="outlined"
                    label="API key"
                    helperText="We'll never share your API key."
                    fullWidth
                    value={apiKey}
                    onChange={handleTextChange}
                    type="text"
                    error={error}
                />
                <Box py={2}>
                    <LoadingButton
                        variant="contained"
                        size="large"
                        loading={loading}
                        endIcon={<ArrowForward />}
                        onClick={handleApiKeySave}
                        disabled={apiKey.length !== 6}
                    >
                        Continue
                    </LoadingButton>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Home;
