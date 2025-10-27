import {supabase} from "@/services/supabaseClient.js";

export async function login(email, password) {
    return await supabase.auth.signInWithPassword({email, password});
}