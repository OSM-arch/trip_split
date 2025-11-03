import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import getBookedTrips from "@/services/getBookedTrips.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import BookedCard from "@/components/bookedCard.jsx";

export default function MyBookings() {

    const user = useSelector(userSelector);

    const [loading, setIsLoading] = useState(true);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        const {data, error: fetchError} = await getBookedTrips(user.user.id, 'passenger');
        if (fetchError) {
            console.log("Error Fetching Booked Trips: ", fetchError.message);
            return;
        }

        setReservations(data);
        setIsLoading(false);
    }

    return (
        <>
            <div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">

                <header
                    className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 dark:bg-background-dark/80 p-4 pb-2 backdrop-blur-sm">
                    <Link
                        to="/user_dashboard"
                        className="flex size-10 shrink-0 items-center justify-center rounded-full text-zinc-800 dark:text-zinc-200">
                        <span className="material-symbols-outlined text-2xl">arrow_back</span>
                    </Link>
                    <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-zinc-100">My
                        Booked Trips</h1>
                    <div className="size-10 shrink-0"></div>
                </header>
                <main className="flex-1 p-4 pt-2">
                    <div className="flex flex-col gap-4">

                        {/* Loading Skeleton */}
                        {
                            loading && <div className="flex flex-col gap-4">
                                <div
                                    className="flex animate-pulse flex-col gap-4 rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-800/50">
                                    <div className="h-5 w-1/2 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                                    <div className="h-6 w-3/4 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                                    <div className="h-5 w-full rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="h-5 w-1/3 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
                                        <div className="h-10 w-32 rounded-lg bg-zinc-200 dark:bg-zinc-700"></div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            !loading && <>
                                {
                                    reservations.map(reservation => <BookedCard key={reservation.id} reservation={reservation} />)
                                }

                                {/* No Bookings */}
                                {
                                    reservations.length === 0 && <div className="flex flex-col items-center gap-6 px-4 py-16 text-center">
                                        <img alt="Illustration of a person looking at a map, representing travel and adventure"
                                             className="w-full max-w-[240px]"
                                             src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJXGg5Q0Zg4Wf1NT_9S0jNrUKGgzI1c9aryrutNYyOte3T4dTww2nrx_-G7--9WXQhxNNdITSvp_bdB7zGgjhdpib6FWyti_HjCC4YpH71sdpJswRShgCdH8gnrf6O2t2_KNR9nfIeAkRRkukVCd4KRLQkC4XR2uxOJouMfb5wY2IqBeAUQNzqGOKyiJaCQZ9hnebNhbi-FfRDBoagzDnNmz3MxDrQOnwdkGmF88egf2sgGxmHGRNaYPuhXhAsyaVsPlxAl8AC2vLl"/>
                                        <div className="flex max-w-sm flex-col items-center gap-2">
                                            <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-zinc-100">No
                                                Trips Booked Yet</p>
                                            <p className="text-sm font-normal text-zinc-600 dark:text-zinc-400">Find a ride and
                                                start your next adventure.</p>
                                        </div>
                                        <Link
                                            to="/find_ride"
                                            className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90">
                                            <span className="truncate">Find a Ride</span>
                                        </Link>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </main>
            </div>
        </>
    )
}