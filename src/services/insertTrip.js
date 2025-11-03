import {supabase} from "@/services/supabaseClient.js";

export default async function insertTrip(
    driver_id,
    start,
    end,
    departure_time,
    available_seats,
    price,
    status,
    suggested_price,
    trip_distance,
    trip_duration)
{
    return supabase.from('trips').insert({
        driver_id, start, end, departure_time, available_seats, price, status, suggested_price, trip_distance, trip_duration
    });
}