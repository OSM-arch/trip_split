import {supabase} from "@/services/supabaseClient.js";

export default async function getMyRides(driver_id) {
    return supabase.from('trips').select('*').eq('driver_id', driver_id);
}