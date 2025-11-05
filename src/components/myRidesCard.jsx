import {useEffect, useRef, useState} from "react";
import deleteTripDriver from "@/services/deleteTripDriver.js";

export default function MyRidesCard({ trip }) {

    const departureDate = new Date(trip.departure_time).toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
    
    const deleteRef = useRef(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const now = new Date();
        const departure_time = new Date(trip.departure_time);

        const diffInDays = (departure_time - now) / (1000 * 60 * 60 * 24);

        if (diffInDays <= 1) {
            if (deleteRef.current) {
                deleteRef.current.disabled = true;
                deleteRef.current.classList.add("cursor-not-allowed", "opacity-50");
            }
        }else {
            deleteRef.current.disabled = false;
            deleteRef.current.classList.remove("cursor-not-allowed", "opacity-50");
            deleteRef.current.classList.add("cursor-pointer");
        }
    }, [trip, trip.departure_time, deleteRef]);
    
    useEffect(() => {
        let timeOutId = "";
        if (error) {
            timeOutId = setTimeout(() => setError(false), 1500);
        }
        return clearTimeout(timeOutId);
    }, [error])

    const handleDelete = async () => {
        setError(false);
        const {error: deleteError} = await deleteTripDriver(trip.id);

        if (deleteError) {
            console.log('Error: deleting trip ', deleteError.message);
            setError(true);
            return;
        }

        window.location.reload();
    }

    return (
        <div className="p-4">

            {
                error && <div
                    className="fixed bottom-6 right-6 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg z-20">
                    <span className="material-symbols-outlined mr-2">cancel</span>
                    <p>Failed to delete the trip. Please try again later.</p>
                </div>
            }

            <div className="flex flex-col gap-4 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg p-5 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-accent text-4xl">directions_car</span>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                {trip.start?.name?.split(",")[0]} → {trip.end?.name?.split(",")[0]}
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{departureDate}</p>
                        </div>
                    </div>

                    <div className="text-right">
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                trip.status === "active"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-200 text-gray-600"
                            }`}
                        >
                            {trip.status}
                        </span>
                    </div>
                </div>

                {/* Trip details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-blue-500">pin_drop</span>
                        <span className="truncate">{trip.start?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-red-500">flag</span>
                        <span className="truncate">{trip.end?.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-purple-500">schedule</span>
                        <span>{trip.trip_duration} min</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-orange-500">straighten</span>
                        <span>{trip.trip_distance} km</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-emerald-500">group</span>
                        <span>{trip.available_seats} seats</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-yellow-500">attach_money</span>
                        <span>{trip.price} MAD</span>
                    </div>
                </div>

                {/* Suggested price note */}
                {/*trip.suggested_price && trip.suggested_price !== trip.price && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                        💡 Suggested price: {trip.suggested_price} MAD
                    </p>
                )*/}

                {/* Actions */}
                <div className="flex justify-end pt-2">
                    <button
                        ref={deleteRef}
                        onClick={handleDelete}
                        className="flex items-center justify-center gap-1 rounded-lg bg-red-500/90 hover:bg-red-600 text-white px-4 py-2 text-sm font-medium transition-all duration-200"
                    >
                        <span className="material-symbols-outlined text-sm">delete</span>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}