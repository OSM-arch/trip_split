import {supabase} from "@/services/supabaseClient.js";

export default function updateReservationStatus(reservation_id, status) {
    return supabase.from('reservations')
        .update({ status: status })
        .eq('id', reservation_id);
}