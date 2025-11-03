import {supabase} from "@/services/supabaseClient.js";

export default async function getDriver(id) {
    return supabase.from('users').select('*').eq('id', id);
}