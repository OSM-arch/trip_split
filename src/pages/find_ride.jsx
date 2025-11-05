import {Link, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import FindRideCard from "@/components/findRideCard.jsx";
import getRides from "@/services/getRides.js";
import getDriver from "@/services/getDriver.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import getBookedTrips from "@/services/getBookedTrips.js";

export default function FindRide() {

    const naviget = useNavigate();
    const user = useSelector(userSelector);

    const [loading, setLoading] = useState(true);
    const [isBooked, setIsBooked] = useState(false);
    const [trips, setTrips] = useState([]);
    const [drivers, setDrivers] = useState({}); // store all driver infos by id
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (user.user === null) {
            naviget('/');
        }
    }, [naviget, user.user]);
    useEffect(() => {
        fetchRides();
    }, []);
    useEffect(() => {
        if (isBooked) {
            setTimeout(() => setIsBooked(false), 1500);
            window.location.reload();
        }
    }, [isBooked]);

    const fetchRides = async () => {
        const { data, error } = await getRides();
        if (error) {
            console.log("Error fetching trips:", error.message);
            setLoading(false);
            return;
        }

        // Fetch all driver infos in parallel for performance
        const driverPromises = data.map(async (trip) => {
            const { data: driverData, error: driverError } = await getDriver(trip.driver_id);
            if (driverError) {
                console.log("Error fetching driver:", driverError.message);
                return null;
            }
            return { id: trip.driver_id, info: driverData[0] };
        });

        const driverResults = await Promise.all(driverPromises);
        const driverMap = {};
        driverResults.forEach((res) => {
            if (res) driverMap[res.id] = res.info;
        });

        // Filter: exclude current user booked trips
        const {data: bookedTrips, error: bookedTripsError} = await getBookedTrips(user.user.id, 'passenger');
        if (bookedTripsError) {
            console.log("Error fetching Booked Trips:", bookedTripsError.message);
            return null;
        }
        // Exclude trips that the user has already booked
        const unbookedTrips = data.filter(
            (trip) => !bookedTrips.some((b) => b.trip_id === trip.id)
        );

        // Exclude trips where the user is the driver
        const filtered = unbookedTrips.filter((trip) => trip.driver_id !== user.user.id);

        setDrivers(driverMap);
        setTrips(filtered);
        setFilteredTrips(filtered);
        setLoading(false);
    };

    // Search filter logic
    const handleSearch = () => {
        const searchTerm = search.toLowerCase().trim();

        if (!searchTerm) {
            setFilteredTrips(trips);
            return;
        }

        const filtered = trips.filter((trip) => {
            const driver = drivers[trip.driver_id];
            const startMatch = trip.start?.name?.toLowerCase().includes(searchTerm);
            const endMatch = trip.end?.name?.toLowerCase().includes(searchTerm);
            const driverMatch = driver?.full_name?.toLowerCase().includes(searchTerm);
            return startMatch || endMatch || driverMatch;
        });

        setFilteredTrips(filtered);
    };

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">

            {
                isBooked && <div
                    className="fixed bottom-6 right-6 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg z-20">
                    <span className="material-symbols-outlined mr-2">check_circle</span>
                    <p>Your booking request has been sent to the driver. You’ll be notified when it’s accepted or declined.</p>
                </div>
            }

            {/* Header */}
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
                <Link
                    to="/user_dashboard"
                    className="text-[#0d131c] cursor-pointer dark:text-white flex size-12 shrink-0 items-center justify-center"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-[#0d131c] dark:text-white text-lg font-bold flex-1 text-center">
                    Find a Ride
                </h2>
            </div>

            {/* Search Inputs */}
            <div className="p-4 space-y-4">
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-[#0d131c] dark:text-gray-300 text-base font-medium pb-2">
                            Search
                        </p>
                        <div className="relative">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by city or driver name..."
                                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-background-light dark:bg-background-dark text-[#0d131c] dark:text-white h-14 px-4"
                            />
                        </div>
                    </label>
                </div>

                {/* Search button */}
                <div className="flex py-3">
                    <button
                        onClick={handleSearch}
                        className="flex min-w-[84px] mx-auto cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-primary text-white text-base font-bold"
                    >
                        <span className="truncate">Search</span>
                    </button>
                </div>
            </div>

            {/* Available rides */}
            <h3 className="text-[#0d131c] dark:text-white text-lg font-bold px-4 pb-2 pt-4">
                Available Rides
            </h3>

            <div className="px-4 space-y-4 pb-4">
                {loading ? (
                    <div>Loading...</div>
                ) : filteredTrips.length > 0 ? (
                    filteredTrips.map((trip) => (
                        <FindRideCard
                            key={trip.id}
                            trip={trip}
                            driver={drivers[trip.driver_id]}
                            setState={setIsBooked}
                        />
                    ))
                ) : (
                    <div className="text-center py-10">
                        <span className="material-symbols-outlined text-6xl text-gray-400 dark:text-gray-500">
                            search_off
                        </span>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">
                            No rides available for this search.
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">
                            Try adjusting your destination or date.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}