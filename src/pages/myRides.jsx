import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import getMyRides from "@/services/getMyRides.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import MyRidesCard from "@/components/myRidesCard.jsx";

export default function MyRides() {
    const user = useSelector(userSelector);

    const [isSuccess, setIsSuccess] = useState(false);
    const [tripsCards, setTripsCard] = useState(null);

    useEffect(() => {
        fetchMyRides()
    }, []);

    const fetchMyRides = async () => {
        const {data, error} = await getMyRides(user.user.id);

        if (error) {
            console.log("Error fetching trips : ", error.message);
            setIsSuccess(false);
            return;
        }

        setTripsCard(() => {
            return data.map((trip) => <MyRidesCard key={trip.id} trip={trip} />);
        });
        setIsSuccess(true);
    }

    return (
        <>
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
                <div className="flex items-center bg-primary p-4 pb-2 justify-between">
                    <div className="flex size-12 shrink-0 items-center">
                        <span className="material-symbols-outlined text-accent text-3xl">
                            <Link to="/user_dashboard">arrow_back</Link>
                        </span>
                    </div>
                    <h2 className="text-accent text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">My
                        Rides</h2>
                    <div className="size-12 shrink-0"></div>
                </div>

                {
                    !isSuccess && <div>No Rides...</div>
                }

                {
                    isSuccess && <div>
                        {tripsCards}
                    </div>
                }

                <div className="fixed bottom-6 right-6">
                    <Link to="/offer_ride"
                        className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-16 w-16 bg-secondary text-accent shadow-lg">
                        <span className="material-symbols-outlined text-4xl">add</span>
                    </Link>
                </div>
            </div>
        </>
    )
}