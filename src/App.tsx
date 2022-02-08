import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Screenshot from "./components/Screenshot";
import AppProvider from "./contexts/App";
import { Path } from "./enums/Paths";

function App() {
    const theme = createTheme({
        typography: {
            fontFamily: ["Mitr", "sans-serif"].join(","),
        },
    });

    return (
        <AppProvider>
            <ThemeProvider theme={theme}>
                <Container className="App">
                    <Routes>
                        <Route path={Path.HOME} element={<Home />} />
                        <Route
                            path={Path.SCREENSHOT}
                            element={<Screenshot />}
                        />
                    </Routes>
                </Container>
            </ThemeProvider>
        </AppProvider>
    );
}

export default App;
