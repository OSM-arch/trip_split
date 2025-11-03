import {supabase} from "@/services/supabaseClient.js";

export default async function getRides() {
    return supabase.from('trips').select('*');
}