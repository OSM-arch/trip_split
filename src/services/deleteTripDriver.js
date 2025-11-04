import {supabase} from "@/services/supabaseClient.js";

export default async function deleteTripDriver(trip_id, status) {
    return supabase.from('trips').update({status}).eq('id', trip_id);
}