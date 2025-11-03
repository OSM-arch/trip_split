import { supabase } from "@/services/supabaseClient.js";

export default async function cancelReservation(reservation_id) {
    return supabase
        .from('reservations')
        .delete()
        .eq('id', reservation_id);
}