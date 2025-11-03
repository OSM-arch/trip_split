import {supabase} from "@/services/supabaseClient.js";

export default async function driverTripsNumber(driver_id) {
    if (!driver_id) return ;
    return supabase.from("trips")
        .select("*", { count: "exact", head: true })
        .eq("driver_id", driver_id);
}