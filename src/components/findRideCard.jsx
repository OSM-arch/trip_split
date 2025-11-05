import tripPosted from "@/utils/tripPosted.js";
import insertReservation from "@/services/insertReservation.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import updateAvailableSeats from "@/services/updateAvailableSeats.js";
import {useEffect, useRef, useState} from "react";

export default function FindRideCard({trip, driver, setState}) {

    const user = useSelector(userSelector);
    const bookButtonRef = useRef(null);

    const departureDate = new Date(trip.departure_time).toLocaleString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });

    useEffect(() => {
        if (trip.available_seats === 0) {
            bookButtonRef.current.disabled = true;
            bookButtonRef.current.classList.add('cursor-not-allowed', 'opacity-50');
        }
    }, [trip.available_seats]);

    const [isSuccess, setIsSuccess] = useState(null);

    const handleSubmit = async () => {
        const {error: insertResError} = await insertReservation(trip.id, user.user.id, driver.id, 'pending');

        if (insertResError) {
            console.log("Error Inserting Reservation: ", insertResError.message);
            setIsSuccess(false);
            return;
        }

        const {error: updateSeatsError} = await updateAvailableSeats(trip.id, trip.available_seats-1);
        if (updateSeatsError) {
            console.log("Error Inserting Reservation: ", updateSeatsError.message);
            setIsSuccess(false);
            return;
        }

        setState(true);
    }

    return (
        <>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex flex-col gap-4">

                <div className="flex items-center gap-4">
                    <img className="w-12 h-12 rounded-full" data-alt="Driver's profile picture"
                         src={driver?.photo_url} alt="driver image"/>
                    <div>
                        <p className="font-bold text-[#0d131c] dark:text-white">{driver?.full_name}</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-yellow-400 text-base">star</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">4.8</span>
                        </div>
                    </div>
                    <div className="ml-auto text-right">
                        <p className="font-bold text-lg text-primary">MAD{trip.price}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">per seat</p>
                    </div>
                </div>
                <div
                    className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                    <div>
                        <p className="font-semibold">{departureDate}</p>
                        <p>{trip.start?.name?.split(",")[0]} → {trip.end?.name?.split(",")[0]}</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-500">
                        <span className="material-symbols-outlined">directions_car</span>
                        <span>{trip.available_seats} seats left</span>
                    </div>
                </div>
                <div className="text-end text-sm text-gray-60 dark:text-gray-400">{tripPosted(trip.created_at)}</div>
                <button onClick={handleSubmit} ref={bookButtonRef} className="w-full bg-primary text-white font-bold py-3 rounded-lg mt-2">Book Seat
                </button>
            </div>
        </>
    )
}