import {supabase} from "@/services/supabaseClient.js";

export async function insertUser (user) {
    const newUser = {...user};
    return supabase.from('users').insert(newUser).single();
}