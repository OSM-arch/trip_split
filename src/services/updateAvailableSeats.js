import {supabase} from "@/services/supabaseClient.js";

export default async function updateAvailableSeats(trip_id, available_seats) {
    return supabase.from('trips').update({ available_seats }).eq('id', trip_id);
}