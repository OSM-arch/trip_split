import { supabase } from "@/services/supabaseClient.js";

export default async function deleteTripDriver(trip_id) {
    return supabase
        .from('trips')
        .delete()
        .eq('id', trip_id);
}