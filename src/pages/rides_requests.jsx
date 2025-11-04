import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import getBookedTrips from "@/services/getBookedTrips.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {fetchUser} from "@/services/fetchUser.js";
import getTripById from "@/services/getTripById.js";
import updateReservationStatus from "@/services/updateReservationStatus.js";

export default function RidesRequests() {

    const user = useSelector(userSelector);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetchReservations(user.user.id);
    }, [user.user.id]);
    
    const fetchReservations = async (driver_id) => {
        const {data, error: fetchError} = await getBookedTrips(driver_id, 'driver');

        if (fetchError) {
            console.log("Error Fetching Reservations: ", fetchError.message);
            return;
        }

        setReservations(data);
    }

    return (
        <>
            <div className="relative flex h-auto min-h-screen w-full flex-col">
                <header
                    className="flex items-center bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pb-2 justify-between sticky top-0 z-10 border-b border-slate-200 dark:border-slate-800">
                    <Link to="/user_dashboard" className="flex size-12 shrink-0 items-center justify-center">
                        <span
                            className="material-symbols-outlined text-2xl text-slate-700 dark:text-slate-300">arrow_back</span>
                    </Link>
                    <h1 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Trip
                        Requests</h1>
                </header>
                <main className="p-4 flex-grow">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {
                            reservations.map((reservation) => <Card key={reservation.id} reservation={reservation} />)
                        }
                    </div>

                    <div className="mt-12 flex flex-col px-4 py-6 col-span-1 md:col-span-2 lg:col-span-3">
                        <div className="flex flex-col items-center gap-6">
                            <div
                                className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                                <span className="material-symbols-outlined text-5xl text-primary">no_transfer</span>
                            </div>
                            <div className="flex max-w-[480px] flex-col items-center gap-2">
                                <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] max-w-[480px] text-center">No
                                    New Trip Requests</p>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal max-w-[480px] text-center">You're
                                    all caught up! We'll notify you when a new request comes in.</p>
                            </div>
                            <button
                                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                <span className="truncate">Refresh</span>
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

function Card({reservation}) {

    const [passenger, setPassenger] = useState([]);
    const [trip, setTrip] = useState({});
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchPassenger();
        fetchTrip();
    }, []);

    const fetchPassenger = async () => {
        const {data, error: fetchError} = await fetchUser(reservation.passenger_id);

        if (fetchError) {
            console.log("Error Fetching Passenger: ", fetchError.message);
            return;
        }

        setPassenger(data[0]);
    }
    const fetchTrip = async () => {
        const {data, error: fetchError} = await getTripById(reservation.trip_id);

        if (fetchError) {
            console.log("Error Fetching Trip: ", fetchError.message);
            return;
        }

        setTrip(data[0]);
    }

    const departureDate = new Date(trip?.departure_time).toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    const handleDecline = async (reservation) => {
        const {error: declineError} = await updateReservationStatus(reservation.id, 'declined');

        if (declineError) {
            console.log("Error declining Reservation: ", declineError.message);
            setIsError(true);
            setIsSuccess(false);
        }

        setMessage("Reservation Request Declined!");
        setIsSuccess(true);
        setIsError(false);
        window.location.reload();
    }

    const handleAccept = async (reservation) => {
        const {error: acceptError} = await updateReservationStatus(reservation.id, 'accepted');

        if (acceptError) {
            console.log("Error accepting Reservation: ", acceptError.message);
            setIsError(true);
            setIsSuccess(false);
        }

        setMessage("Reservation Request Accepted!");
        setIsSuccess(true);
        setIsError(false);
        window.location.reload();
    }

    console.log(passenger);
    return (
        <>
            <div
                className="flex flex-col items-stretch justify-start rounded-xl bg-slate-50 dark:bg-slate-800/50 p-4 @container shadow-sm border border-slate-200 dark:border-slate-800">

                {
                    isSuccess && <div
                        className="fixed bottom-6 right-6 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg z-20">
                        <span className="material-symbols-outlined mr-2">check_circle</span>
                        <p>{message}</p>
                    </div>
                }
                {
                    isError && <div
                        className="fixed bottom-6 right-6 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg z-20">
                        <span className="material-symbols-outlined mr-2">block</span>
                        <p>{message}</p>
                    </div>
                }

                <div className="flex items-center gap-4 mb-4">
                    <img className="h-14 w-14 shrink-0 rounded-full object-cover"
                         data-alt="Profile picture of Ethan Hayes"
                         src={passenger?.photo_url} alt="passenger image"/>
                    <div className="flex flex-col gap-0.5">
                        <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                            {passenger?.full_name}
                        </p>
                        <div
                            className="inline-flex items-center justify-start rounded-md dark:bg-yellow-500/20 px-2 py-0.5">
                            {
                                reservation.status === 'pending' ? <p className="text-xs font-medium bg-yellow-100 text-yellow-600 dark:text-yellow-400">Pending</p>
                                    :
                                    reservation.status === 'accepted' ? <p className="text-xs font-medium bg-green-100 text-green-600 dark:text-yellow-400">Accepted</p>
                                        :
                                        <p className="text-xs font-medium bg-red-100 text-red-600 dark:text-yellow-400">Declined</p>
                            }
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        {trip.start?.name?.split(",")[0]} → {trip.end?.name?.split(",")[0]}
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        {departureDate} • {trip.available_seats} Seats</p>
                </div>
                <div className="mt-auto flex items-center gap-3">
                    {
                        reservation.status === 'pending' && <>
                            <button
                                onClick={() => handleDecline(reservation)}
                                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white text-sm font-medium leading-normal hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                                <span className="truncate">Decline</span>
                            </button>
                            <button
                                onClick={() => handleAccept(reservation)}
                                className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-medium leading-normal hover:bg-primary/90 transition-colors">
                                <span className="truncate">Accept</span>
                            </button>
                        </>
                    }
                </div>
            </div>
        </>
    )
}