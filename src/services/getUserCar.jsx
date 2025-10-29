import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@/store/selectors/userSelector.js";
import { supabase } from "@/services/supabaseClient.js";
import { setCar } from "@/store/features/userSlice.js";

export default function GetUserCar() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user.user?.id || user.car !== null) return;

        const fetchCar = async () => {
            try {
                const { data, error } = await supabase
                    .from("car")
                    .select("*")
                    .eq("user_id", user.user.id);

                if (error && error.code !== "PGRST116") {
                    // PGRST116 = "No rows found" error from supabase
                    console.error("Error fetching car:", error.message);
                    return;
                }

                dispatch(setCar(data || null));
            } catch (err) {
                console.error("Unexpected error fetching car:", err);
            }
        };

        fetchCar();
    }, [dispatch, user.car, user.user?.id]);

    return (<></>);
}