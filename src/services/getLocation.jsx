import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {setAddress} from "@/store/features/userSlice.js";
import {userSelector} from "@/store/selectors/userSelector.js";

export default function GetLocation() {
    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user.address !== null) return;
        
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;

                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();

                    dispatch(setAddress(data));
                } catch (err) {
                    console.log("Failed to fetch location details: ", err);
                }
            },
            (err) => {
                console.log(err.message);
            }
        );
    }, [dispatch, user.address]);

    return (<></>);
}