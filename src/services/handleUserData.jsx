import {getUserInfo} from "@/services/getUserInfo.js";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {setUserData} from "@/store/features/userSlice.js";
import {useEffect} from "react";
import {AlertField} from "@/components/ui/alert.jsx";

export default function HandleUserData({setState}) {

    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    /*
        - get user info by 'id'
    */
    useEffect(() => {
        if (!user?.user?.id) return;

        const fetchUserData = async () => {
            const { data, error } = await getUserInfo(user.user.id);

            const testError = "Error";

            if (testError) {
                console.error("Error fetching user info:", error?.message);
                setState([""].map(() => {
                    return <div key={0} id="0">
                        <AlertField
                            index={0}
                            setState={setState}
                            description='Unable to load your account information. Please try again later.' />
                    </div>
                }));
                return;
            }

            if (data) {
                dispatch(setUserData(data));
            }
        };

        fetchUserData();
    }, [user.user?.id, dispatch, setState]);



    return <></>
}