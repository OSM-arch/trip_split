import {useEffect} from "react";
import {supabase} from "@/services/supabaseClient.js";
import {setUser} from "@/store/features/userSlice.js";
import {useDispatch} from "react-redux";

export default function AuthProvider() {

    const dispatch = useDispatch();

    useEffect(() => {

        /*
          Check current user
        */
        const getCurrentSession = async () => {
            const { data } = await supabase.auth.getSession();
            return data;
        }
        getCurrentSession().then(data => dispatch(setUser(data.session?.user ?? null)));


        /*
          Listen for auth changes (login / logout)
        */
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            dispatch(setUser(session?.user ?? null));
        });

        /*
          unsubscribe form the listener
        */
        return () => {
            listener.subscription.unsubscribe();
        };

    }, [dispatch]);

    return (
        <></>
    )
}