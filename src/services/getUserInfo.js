import {supabase} from "@/services/supabaseClient.js";

export const getUserInfo = (id) => {
    return supabase.from('users').select('*').eq('id', id).single();
}