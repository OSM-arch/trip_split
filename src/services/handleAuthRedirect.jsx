import {useNavigate} from "react-router-dom";
import {insertUser} from "@/services/insertUser.js";
import {useEffect, useState} from "react";
import {supabase} from "@/services/supabaseClient.js";

export default function HandleAuthRedirect() {
    const naviget = useNavigate();

    const [message, setMessage] = useState('Verifying your account, please wait...');

    useEffect(() => {

        const handleAuthCallback = async () => {
            const { data, error } = await supabase.auth.getSession();
            return {data, error};
        };

        handleAuthCallback().then(async ({data, error}) => {
            if (error) {
                setMessage('Something went wrong while signing you in. Please try again.');
                return;
            }

            if (data.session) {
                const user = data.session.user;
                const {error: insertError} = await insertUser({
                    id: user.id,
                    full_name: user.user_metadata.fullname,
                    email: user.email,
                    password: user.user_metadata.hashedPassword
                })

                if (insertError) {
                    console.error("Error getting session:", insertError.message);
                    setMessage('Something went wrong while signing you in. Please try again.');
                    return;
                }

                setMessage('Authentication successful. Taking you to your dashboard...');
                setTimeout(() => {naviget('/')}, 1500);
            }
        });

    }, [naviget]);

    return (
        <>
            <div className="flex items-center justify-center h-screen text-white bg-gray-900">
                <p>{message}</p>
            </div>
        </>
    )
}