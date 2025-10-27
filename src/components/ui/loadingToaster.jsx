import theme from "@/theme/theme.js";
import { Toaster, toaster } from "@/components/ui/toaster";
import { ChakraProvider } from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

export default function LoadingToaster({type}) {

    const naviget = useNavigate();

    if (type === 'login') {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(), 1000);
        }).then(() => setTimeout(()=> naviget('/'), 3000));

        toaster.promise(promise, {
            success: {
                title: "Login Successfully!",
                description: "redirecting...",
            },
            error: {
                title: "Upload failed",
                description: "Something went wrong with the upload",
            },
            loading: {
                title: "Login...",
                description: "Please wait",
            },
        });
    }

    if (type === 'signup') {
        const promise = new Promise((resolve) => {
            setTimeout(() => resolve(), 1000);
        }).then(() => setTimeout(()=> naviget('/'), 3000));

        toaster.promise(promise, {
            success: {
                title: "Sign up Successfully!",
                description: "Check your email address",
            },
            error: {
                title: "Upload failed",
                description: "Something went wrong with the upload",
            },
            loading: {
                title: "Signing...",
                description: "Please wait",
            },
        });
    }



    return (
        <ChakraProvider value={theme}>
            <Toaster />
        </ChakraProvider>
    );
}