import {supabase} from "@/services/supabaseClient.js";

export default async function getBookedTrips(id, role) {
    if (role === 'passenger') {
        return supabase.from('reservations').select('*').eq('passenger_id', id);
    }

    if  (role === 'driver') {
        return supabase.from('reservations').select('*').eq('driver_id', id);
    }
}