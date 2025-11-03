import { useEffect, useState } from "react";
import getRidesById from "@/services/getRidesById.js";
import cancelReservation from "@/services/cancelReservation.js";

export default function BookedCard({ reservation }) {
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        if (reservation?.trip_id) {
            fetchTrip(reservation.trip_id);
        }
    }, [reservation]);

    const fetchTrip = async (trip_id) => {
        const { data, error } = await getRidesById(trip_id);
        if (error) {
            console.log("Error fetching trip: ", error.message);
            return;
        }
        setTrip(data[0]);
    };

    if (!trip) return null;

    return <Card trip={trip} reservation={reservation} />;
}

export function Card({ trip, reservation }) {
    const departureDate = new Date(trip.departure_time).toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    const [canceled, setCanceled] = useState(false);

    useEffect(() => {
        if (canceled) {
            setTimeout(() => setCanceled(false), 1500);
        }
    }, [canceled]);

    const cancelBooking = async (reservationId) => {
        const { data, error } = await cancelReservation(reservationId);
        if (error) {
            console.log("Error cancelling reservation:", error.message);
        } else {
            setCanceled(true);
        }
    }

    return (
        <div className="flex flex-col items-stretch justify-start rounded-xl bg-white p-4 shadow-sm dark:bg-zinc-800/50">

            {
                canceled && <div
                    className="fixed bottom-6 right-6 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg z-20">
                    <span className="material-symbols-outlined mr-2">check_circle</span>
                    <p>Trip Canceled successfully!</p>
                </div>
            }

            <div className="flex w-full flex-col items-stretch justify-center gap-2">
                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-normal text-zinc-500 dark:text-zinc-400">{departureDate}</p>
                    <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            reservation.status === "accepted"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                                : reservation.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}
                    >
                        {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1)}
                    </span>
                </div>
                <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-zinc-100">
                    {trip.start?.name?.split(",")[0]} → {trip.end?.name?.split(",")[0]}
                </p>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">chair</span>
                        <span>{reservation.seats_booked} Seats</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-base">sell</span>
                        <span>MAD {trip.price}</span>
                    </div>
                </div>
                <div className="mt-2 flex items-end justify-between gap-3">
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">{tripBookedTime(trip.created_at)}</p>
                    <button
                        className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-4 text-sm font-bold text-white shadow-sm transition-colors hover:bg-primary/90"
                        onClick={() => cancelBooking(reservation.id)}
                    >
                        <span className="truncate">Cancel Booking</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


function tripBookedTime(createdAt) {
    const diffMs = new Date() - new Date(createdAt);
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return "Booked just now";
    if (diffHours < 24) return `Booked ${diffHours} hours ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `Booked ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}