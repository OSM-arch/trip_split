import {supabase} from "@/services/supabaseClient.js";

export default async function insertCar(carData, user_id) {
    if (!user_id) {
        console.log(user_id);
        return;
    }
    try {
        const { data, error } = await supabase
            .from("car")
            .select("*")
            .eq("user_id", user_id)
            .single();

        if (error && error.code !== "PGRST116") {
            console.log(error.message);
            return error;
        }

        if (data) {
            // update existing car
            const { error: updateError } = await supabase
                .from("car")
                .update(carData)
                .eq("id", data.id);

            return updateError || null;
        } else {
            // insert new car
            const { error: insertError } = await supabase
                .from("car")
                .insert(carData);

            return insertError || null;
        }
    } catch (err) {
        return err;
    }
}