import {supabase} from "@/services/supabaseClient.js";

export default async function insertReservation(trip_id, passenger_id, driver_id, status) {
    return supabase.from('reservations').insert({
        trip_id, passenger_id, status, driver_id
    });
}