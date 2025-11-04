import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {useEffect, useState} from "react";
import {fetchUser} from "@/services/fetchUser.js";
import {AlertField} from "@/components/ui/alert.jsx";
import {clearAll, setUserData} from "@/store/features/userSlice.js";
import memberSince from "@/utils/memberSince.js";
import GetUserCar from "@/services/getUserCar.jsx";
import EditProfile from "@/pages/editProfile.jsx";
import driverTripsNumber from "@/services/driverTripsNumber.js";
import {logout} from "@/services/logout.js";
import {persistor} from "@/store/store.js";

export default function UserDashboard() {
    const naviget = useNavigate();

    const user = useSelector(userSelector);
    const dispatch = useDispatch();

    const [totalDrives, setTotalDrives] = useState(0);
    const [profilePic, setProfilePic] = useState("/defaultUser.png");
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTotalRides = async () => {
            const {count, error} = await driverTripsNumber(user.user?.id);

            if (error) {
                console.error("Error fetching driver trips count:", error);
                return null;
            }

            return count;
        }
        setTotalDrives(fetchTotalRides() || 0);
    }, [user.user?.id]);
    /*
       - Adjust Profile Picture
    */
    useEffect(() => {
        if (user.userData?.photo_url) {
            setProfilePic(user.userData.photo_url);
        }else {
            if (user.userData?.gender) {
                if (user.userData.gender === "Male") {
                    setProfilePic("/defaultBoy.png");
                }else if (user.userData.gender === "Female") {
                    setProfilePic("/defaultGirl.png");
                }
            }else {
                setProfilePic("/defaultUser.png");
            }
        }
    }, [user.userData?.gender, user.userData?.photo_url]);

    /*
       - automatically redirect any anonymous user
    */
    useEffect(() => {
        if (user.user === null) {
            naviget('/');
        }
    }, [naviget, user.user]);
    
    /*
        - fetch user data
     */
    useEffect(() => {
        const handleFetch = async () => {
            if (!user.user?.id) return;
            const { data, error: testError } = await fetchUser(user.user?.id);

            if (testError) {
                setError([""].map(() => {
                    return <div key={0} id="0">
                        <AlertField
                            index={0}
                            setState={setError}
                            description='Unable to load your account information. Please try again later.' />
                    </div>
                }));
                return;
            }

            if (data) {
                dispatch(setUserData(data[0]));
            }
        }
        handleFetch();
    }, [dispatch, error?.message, user.user?.id]);

    const handleLogout = async () => {
        const is_error = await logout();

        if (!is_error) {
            dispatch(clearAll());
            await persistor.purge();
        }
        naviget("/");
    }

    return (
        <>
            <GetUserCar />
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">

                <div className="absolute bottom-[1%] right-[1%] w-max flex flex-col gap-2">
                    {error !== null ? error.map((err) => err) : ""}
                </div>
                
                <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
                    <Link to="/">
                        <button
                            className="text-slate-800 dark:text-slate-200 flex size-12 shrink-0 items-center justify-center rounded-full bg-background-light dark:bg-slate-800"
                            data-icon="ArrowLeft" data-size="24px" data-weight="regular">
                            <span className="material-symbols-outlined">home</span>
                        </button>
                    </Link>
                    <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">My
                        Profile</h2>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center h-12 w-12 rounded-full bg-background-light dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                        <span className="material-symbols-outlined">logout</span>
                    </button>
                </div>
                <div className="flex p-4 @container">
                    <div className="flex w-full flex-col gap-4 items-center">
                        <div className="flex gap-4 flex-col items-center">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                                 data-alt="profile picture"
                            >
                                <img
                                    alt="profile picture"
                                    className="h-full w-full object-cover rounded-[50%]"
                                    src={profilePic}
                                />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-slate-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">
                                    {user.userData?.full_name}
                                </p>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal text-center">
                                    {memberSince(user.userData?.created_at)}
                                </p>
                            </div>
                        </div>
                        <button
                            className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 dark:bg-primary/30 text-primary text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto"
                            onClick={() => setIsOpen(true)}
                        >
                            <span className="truncate">
                                Edit Profile
                            </span>
                        </button>
                    </div>
                </div>
                <div className="pb-3">
                    <div className="flex border-b border-slate-200 dark:border-slate-700 px-4 justify-between">
                        <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-slate-800 dark:text-white pb-[13px] pt-4 flex-1"
                           href="#">
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Info</p>
                        </a>
                        <Link className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1"
                           to="/myrides">
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">My Rides</p>
                        </Link>
                        <Link to="/mybookings" className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1"
                           href="#">
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Booked</p>
                        </Link>
                        <Link className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1"
                           to="/rides_requests">
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Rides Requests</p>
                        </Link>
                    </div>
                </div>
                <div className="p-4 grid grid-cols-[30%_1fr] gap-x-6">
                    <div
                        className="col-span-2 grid grid-cols-subgrid border-t border-t-slate-200 dark:border-t-slate-700 py-5">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Location</p>
                        <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal">
                            {user.address !== null ?
                                `${user.address.address.city ? user.address.address.city : user.address.address.town}, ${user.address.address.region}, ${user.address.address.country}`
                                :
                                ""
                            }
                        </p>
                    </div>
                    <div
                        className="col-span-2 grid grid-cols-subgrid border-t border-t-slate-200 dark:border-t-slate-700 py-5">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Vehicle</p>
                        <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal">
                            {user.car ? user.car[0]?.model : ""}
                        </p>
                    </div>
                    <div
                        className="col-span-2 grid grid-cols-subgrid border-t border-t-slate-200 dark:border-t-slate-700 py-5">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Total Rides</p>
                        <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal">
                            {totalDrives}
                        </p>
                    </div>
                    <div
                        className="col-span-2 grid grid-cols-subgrid border-t border-b border-slate-200 dark:border-slate-700 py-5">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Rating</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-slate-300" style={{fontSize: "18px"}}>star</span>
                            <span className="material-symbols-outlined text-slate-300" style={{fontSize: "18px"}}>star</span>
                            <span className="material-symbols-outlined text-slate-300" style={{fontSize: "18px"}}>star</span>
                            <span className="material-symbols-outlined text-slate-300" style={{fontSize: "18px"}}>star</span>
                            <span className="material-symbols-outlined text-slate-300 dark:text-slate-600"
                                  style={{fontSize: "18px"}}>star</span>
                            <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal ml-1">0.0 (0
                                reviews)</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center gap-2 px-4 py-3 mt-auto">
                    <Link to="/find_ride" className="flex min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                        <span>Find a Ride</span>
                    </Link>
                    <Link to="/offer_ride" className="flex min-w-[84px] max-w-[480px] flex-1 items-center justify-center rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                        <span>Offer a Ride</span>
                    </Link>
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50 overflow-y-auto pt-[calc(115vh-200px)]">
                    <EditProfile setIsOpen={setIsOpen} />
                </div>
            )}
        </>
    )
}