import {supabase} from "@/services/supabaseClient.js";

export const fetchUser = async (id) => {
    return supabase.from('users').select('*').eq('id', id);
}