import {supabase} from "@/services/supabaseClient.js";

export default async function getTripById(trip_id) {
    return supabase.from('trips').select("*").eq('id', trip_id);
}