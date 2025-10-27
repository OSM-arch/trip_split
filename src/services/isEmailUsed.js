import {supabase} from "@/services/supabaseClient.js";

export const isEmailUsed = async (userEmail) => {
    return supabase.from('users').select('id, email').eq('email', userEmail).maybeSingle();
}