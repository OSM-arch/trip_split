import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {useEffect, useState} from "react";
import HandleUserData from "@/services/handleUserData.jsx";
import LoadingPage from "@/components/loadingPage.jsx";

export default function UserDashboard() {
    const naviget = useNavigate();
    const user = useSelector(userSelector);

    const [error, setError] = useState(null);

    /*
       - automatically redirect any anonymous user
    */
    useEffect(() => {
        if (user === null) {
            naviget('/');
        }
    }, [naviget, user]);

    return (
        <>
            <HandleUserData setState={setError} />
            {
                error !== null ?
                    <>
                        <LoadingPage />
                    </>
                    :
                    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                        <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
                            <button
                                className="text-slate-800 dark:text-slate-200 flex size-12 shrink-0 items-center justify-center rounded-full bg-background-light dark:bg-slate-800"
                                data-icon="ArrowLeft" data-size="24px" data-weight="regular">
                                <span className="material-symbols-outlined">arrow_back</span>
                            </button>
                            <h2 className="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">My
                                Profile</h2>
                            <button
                                className="flex items-center justify-center h-12 w-12 rounded-full bg-background-light dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                                <span className="material-symbols-outlined">settings</span>
                            </button>
                        </div>
                        <div className="flex p-4 @container">
                            <div className="flex w-full flex-col gap-4 items-center">
                                <div className="flex gap-4 flex-col items-center">
                                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                                         data-alt="profile picture"
                                    ></div>
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="text-slate-800 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] text-center">Alex
                                            Doe</p>
                                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal text-center">Member
                                            since 2023</p>
                                    </div>
                                </div>
                                <button
                                    className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary/20 dark:bg-primary/30 text-primary text-sm font-bold leading-normal tracking-[0.015em] w-full max-w-[480px] @[480px]:w-auto">
                                    <span className="truncate">Edit Profile</span>
                                </button>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="flex border-b border-slate-200 dark:border-slate-700 px-4 justify-between">
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-slate-800 dark:text-white pb-[13px] pt-4 flex-1"
                                   href="#">
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Info</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1"
                                   href="rides.html">
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Offered</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1"
                                   href="#">
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Booked</p>
                                </a>
                                <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-slate-500 dark:text-slate-400 pb-[13px] pt-4 flex-1"
                                   href="reviews.html">
                                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Reviews</p>
                                </a>
                            </div>
                        </div>
                        <div className="p-4 grid grid-cols-[30%_1fr] gap-x-6">
                            <div
                                className="col-span-2 grid grid-cols-subgrid border-t border-t-slate-200 dark:border-t-slate-700 py-5">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Location</p>
                                <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal">San Francisco,
                                    CA</p>
                            </div>
                            <div
                                className="col-span-2 grid grid-cols-subgrid border-t border-t-slate-200 dark:border-t-slate-700 py-5">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Vehicle</p>
                                <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal">Toyota Camry</p>
                            </div>
                            <div
                                className="col-span-2 grid grid-cols-subgrid border-t border-t-slate-200 dark:border-t-slate-700 py-5">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Total Rides</p>
                                <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal">24</p>
                            </div>
                            <div
                                className="col-span-2 grid grid-cols-subgrid border-t border-b border-slate-200 dark:border-slate-700 py-5">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Rating</p>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-green-500" style={{fontSize: "18px"}}>star</span>
                                    <span className="material-symbols-outlined text-green-500" style={{fontSize: "18px"}}>star</span>
                                    <span className="material-symbols-outlined text-green-500" style={{fontSize: "18px"}}>star</span>
                                    <span className="material-symbols-outlined text-green-500" style={{fontSize: "18px"}}>star</span>
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600"
                                          style={{fontSize: "18px"}}>star</span>
                                    <p className="text-slate-800 dark:text-white text-sm font-normal leading-normal ml-1">4.0 (12
                                        reviews)</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2 px-4 py-3 mt-auto">
                            <button
                                className="flex min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
                                <span><Link to="find_ride">Find a Ride</Link></span>
                            </button>
                            <button
                                className="flex min-w-[84px] max-w-[480px] flex-1 items-center justify-center rounded-lg h-12 px-6 bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark text-base font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-gray-300 dark:hover:bg-gray-600">
                                <span><Link to="offer_ride" target="_self">Offer a Ride</Link></span>
                            </button>
                        </div>
                    </div>
            }
        </>
    )
}