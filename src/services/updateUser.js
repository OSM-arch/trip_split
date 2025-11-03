import { supabase } from "@/services/supabaseClient.js";

export default async function updateUser(dataArray, id) {
    let error = null;

    const { error: updateError } = await supabase
        .from("users")
        .update(dataArray)
        .eq("id", id);

    if (updateError) {
        error = updateError;
        return error;
    }

    return null;
}