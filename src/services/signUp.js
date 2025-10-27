import {supabase} from "@/services/supabaseClient.js";

export async function signUp(email, password, fullname, hashedPassword) {
    return await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {fullname: fullname, hashedPassword: hashedPassword},
            emailRedirectTo: "http://localhost:5173/auth/callback", // prod domain here
        },
    });
}