import {supabase} from "@/services/supabaseClient.js";

export default function getRidesById(id) {
    return supabase.from('trips').select('*').eq('id', id);
}