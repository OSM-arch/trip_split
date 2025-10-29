import { supabase } from "@/services/supabaseClient.js";

export default async function updateUser(dataArray, id) {
    let error = null;

    for (const data of dataArray) {
        const key = Object.keys(data)[0];

        const { error: updateError } = await supabase
            .from("users")
            .update({ [key]: data[key] })
            .eq("id", id);

        if (updateError) {
            error = updateError;
            break;
        }
    }

    return error;
}