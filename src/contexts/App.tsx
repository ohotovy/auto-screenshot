import Snackbar from "@mui/material/Snackbar";
import { createContext, useContext, useEffect, useState } from "react";
import { Token } from "../interfaces/Token";
import { getAccessToken } from "../services/api/getAccessToken";

interface AppContextData {
    auth: {
        apiKey: string | null;
        saveApiKey: (apiKey: string) => Promise<boolean>;
        getValidGoogleCredentials: () => Promise<Token | null>;
    };
    showToast: (message: string) => void;
}

const AppContext = createContext<AppContextData>({} as AppContextData);

interface Props {
    children: React.ReactNode;
}

const AppProvider = ({ children }: Props) => {
    const [apiKey, setApiKey] = useState<string | null>(null);
    const [accessToken, setAccessToken] = useState<Token | null>(null);
    const [messsage, setMessage] = useState<string | undefined>();
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        getValidGoogleCredentials();
    }, []);

    const getValidGoogleCredentials = async (): Promise<Token | null> => {
        if (!accessToken || accessToken.expiresAtMs <= Date.now()) {
            try {
                const accessToken = await getAccessToken();
                setAccessToken(accessToken);
                return accessToken;
            } catch (error) {
                console.error(error);
                setAccessToken(null);
                return null;
            }
        }
        return accessToken;
    };

    const showToast = (message: string) => {
        setMessage(message);
        setOpen(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        setOpen(false);
    };

    const saveApiKey = async (key: string): Promise<boolean> => {
        // TODO - validate API key
        setApiKey(key);
        return true;
    };

    return (
        <AppContext.Provider
            value={{
                auth: {
                    apiKey,
                    saveApiKey,
                    getValidGoogleCredentials,
                },
                showToast,
            }}
        >
            <Snackbar
                open={open}
                onClose={handleClose}
                message={messsage}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                autoHideDuration={6000}
            />
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

export const useAuth = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw Error("useAuth can only be used within AppProvider");
    }
    return context.auth;
};

export const useToast = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw Error("useToast can only be used within AppProvider");
    }
    return context.showToast;
};
