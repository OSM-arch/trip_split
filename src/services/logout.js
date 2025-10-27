import {supabase} from "@/services/supabaseClient.js";

export const logout = async () => {
    const {error} = await supabase.auth.signOut();

    if (error) {
        console.log("Error Signing Out: ", error.message);
        return true;
    }

    return false;
}