import MapDisplay from "@/components/map.jsx";
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import suggestPrice from "@/utils/suggestPrice.js";
import {useSelector} from "react-redux";
import {userSelector} from "@/store/selectors/userSelector.js";
import {AlertField} from "@/components/ui/alert.jsx";
import validateFormTrip from "@/utils/validateFormTrip.js";
import insertTrip from "@/services/insertTrip.js";

export default function OfferRide() {
    const user = useSelector(userSelector);

    // Trip Details
    const [tripDuration, setTripDuration] = useState("");
    const [tripDistance, setTripDistance] = useState("");
    const [suggestedPrice, setSuggestedPrice] = useState("");

    const dateRef = useRef(null);
    const availableSeatsRef = useRef(null);
    const priceRef = useRef(null);
    
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);
    const [startQuery, setStartQuery] = useState("");
    const [endQuery, setEndQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const [error, setError] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        availableSeatsRef.current.min = 1;
        availableSeatsRef.current.max = 6;
        if (user.car?.length > 0 && user.car[0].seats) {
            availableSeatsRef.current.max = user.car[0].seats;
        }
    }, [user.car]);
    useEffect(() => {
        // Only fetch if user typed at least 3 characters
        if (startQuery.length < 3) return;

        // Add a small delay before fetching (to avoid flooding API)
        const timeoutId = setTimeout(() => fetchSuggestions(startQuery), 500);
        return () => clearTimeout(timeoutId);
    }, [startQuery]);
    useEffect(() => {
        // Only fetch if user typed at least 3 characters
        if (endQuery.length < 3) return;

        // Add a small delay before fetching (to avoid flooding API)
        const timeoutId = setTimeout(() => fetchSuggestions(endQuery), 500);
        return () => clearTimeout(timeoutId);
    }, [endQuery]);
    useEffect(() => {
        if (start && end) {
            setIsOpen(true);
        }
    }, [start, end]);
    useEffect(() => {
        if (tripDuration && tripDistance) {
            setSuggestedPrice(suggestPrice(tripDistance, tripDuration));
        }
    }, [tripDistance, tripDuration]);
    useEffect(() => {
        if (isSuccess === true) {
            setTimeout(() => setIsSuccess(false), 1000);
        }
    }, [isSuccess]);

    const fetchSuggestions = async (query) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error("Error fetching address suggestions:", error);
        }
    };

    const handleChange = (event, query, type) => {

        if (type === "start") {
            setStartQuery(event.target.value);
        }

        if (type === "end") {
            setEndQuery(event.target.value);
        }
    }
    const handleSelect = (value, type) => {
        const selected = suggestions.find(
            (s) => s.display_name === value
        );
        if (selected) {
            setSuggestions([]);
            if (type === "start") {
                setStartQuery(selected.display_name);
                setStart({
                    name: selected.display_name,
                    lat: selected.lat,
                    lon: selected.lon,
                });
            }

            if (type === "end") {
                setEndQuery(selected.display_name);
                setEnd({
                    name: selected.display_name,
                    lat: selected.lat,
                    lon: selected.lon,
                })
            }
        }
    };
    const handleSubmit = async () => {

        const res = validateFormTrip(start, end, dateRef.current.value, availableSeatsRef.current.value, priceRef.current.value)
        setError(null);
        setIsSuccess(false);

        /*
          Handle Form Error
        */
        if (res !== null) {

            let i = -1;
            setError(res.map(msg => {
                i = i+1;
                return <div key={i} id={i}><AlertField index={i} setState={setError} description={msg} /></div>
            }));
            return;
        }

        /*
          Handle Form Success
        */
        if (user.user.id && suggestedPrice && tripDistance && tripDuration) {
            const {error: insertError} = await insertTrip(
                user.user.id,
                start,
                end,
                new Date(dateRef.current.value),
                availableSeatsRef.current.value,
                priceRef.current.value,
                'active',
                suggestedPrice,
                Math.round(parseFloat(tripDistance)),
                Math.round(parseFloat(tripDuration))
            );

            if (insertError) {
                setError([insertError.message].map(err => {
                    return <div key={0} id="0"><AlertField index={0} setState={setError} description={err} /></div>
                }));
                return;
            }

            setIsSuccess(true);

        }else {
            setError([].map(() => {
                return <div key={0} id="0"><AlertField index={0} setState={setError} description="Something messing! please try again." /></div>
            }));
        }
    }

    return (<>
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">

            {
                isSuccess && <div
                        className="fixed bottom-6 right-6 flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg z-20">
                    <span className="material-symbols-outlined mr-2">check_circle</span>
                    <p>Trip submitted successfully!</p>
                </div>
            }

            <div className="absolute z-50 bottom-[1%] right-[1%] w-max flex flex-col gap-2">
                {error !== null ? error.map((err) => err) : ""}
            </div>

            <div
                className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
                <Link to="/user_dashboard" className="text-accent flex size-12 shrink-0 items-center justify-center">
                    <span className="material-symbols-outlined">arrow_back</span>
                </Link>
                <h2 className="text-text-light dark:text-text-dark text-xl font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Publish
                    a Ride</h2>
                <div className="flex w-12 items-center justify-end">
                </div>
            </div>
            <main className="flex-grow p-4 space-y-6">
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col w-full">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">From</p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                            <input
                                type="text"
                                id="start"
                                value={startQuery}
                                onChange={(e) => handleChange(e, e.target.value, 'start')}
                                onBlur={(e) => handleSelect(e.target.value, 'start')}
                                list="start_suggestions"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pr-2 text-base font-normal leading-normal"
                                placeholder="Enter departure address"
                            />
                            <datalist id="start_suggestions">
                                {suggestions.map((place, index) => (
                                    <option key={index} value={place.display_name} />
                                ))}
                            </datalist>
                            <div
                                onClick={() => setIsOpen(true)}
                                className="text-accent cursor-pointer flex border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                        </div>
                    </label>
                    <label className="flex flex-col w-full">
                        <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">To</p>
                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                            <input
                                type="text"
                                id="end"
                                value={endQuery}
                                onChange={(e) => handleChange(e, e.target.value, 'end')}
                                onBlur={(e) => handleSelect(e.target.value, 'end')}
                                list="end_suggestions"
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pr-2 text-base font-normal leading-normal"
                                placeholder="Enter destination address"
                            />
                            <datalist id="end_suggestions">
                                {suggestions.map((place, index) => (
                                    <option key={index} value={place.display_name} />
                                ))}
                            </datalist>
                            <div
                                onClick={() => setIsOpen(true)}
                                className="text-accent cursor-pointer flex border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark items-center justify-center pr-[15px] rounded-r-lg border-l-0">
                                <span className="material-symbols-outlined">location_on</span>
                            </div>
                        </div>
                    </label>
                    <div className="flex flex-wrap items-end gap-4">
                        <label className="flex flex-col min-w-40 flex-1 relative">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Date</p>
                            <input
                                ref={dateRef}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pl-12 text-base font-normal leading-normal"
                                placeholder="Select date"
                                type="date"/>
                            <div
                                className="text-accent absolute left-3 top-1/2 -translate-y-1/2 mt-5 pointer-events-none">
                                <span className="material-symbols-outlined">calendar_today</span>
                            </div>
                        </label>
                        <label className="flex flex-col min-w-40 flex-1 relative">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Trip Distance/Duration</p>
                            <input
                                value={`${tripDistance} km / ${tripDuration} min`}
                                className="form-input cursor-not-allowed flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pl-12 text-base font-normal leading-normal"
                                disabled={true}
                                type="text"/>
                            <div
                                className="text-accent absolute left-3 top-1/2 -translate-y-1/2 mt-5 pointer-events-none">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-wrap items-end gap-4">
                        <label className="flex flex-col min-w-40 flex-1 relative">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">Available
                                Seats</p>
                            <input
                                ref={availableSeatsRef}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pl-12 text-base font-normal leading-normal"
                                placeholder="1" type="number" defaultValue=""/>
                            <div
                                className="text-accent absolute left-3 top-1/2 -translate-y-1/2 mt-5 pointer-events-none">
                                <span className="material-symbols-outlined">person</span>
                            </div>
                        </label>
                        <label className="flex flex-col min-w-40 flex-1 relative">
                            <p className="text-text-light dark:text-text-dark text-base font-medium leading-normal pb-2">
                                Price {suggestedPrice && <strong>(Suggested Price: <span className='text-green-500'>{suggestedPrice} MAD</span>)</strong>
                                }
                            </p>
                            <input
                                ref={priceRef}
                                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-text-light dark:text-text-dark focus:outline-0 focus:ring-0 border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark focus:border-primary h-14 placeholder:text-gray-400 dark:placeholder:text-gray-500 p-[15px] pl-12 text-base font-normal leading-normal"
                                placeholder="0.00" type="number" defaultValue=""/>
                            <div
                                className="text-accent absolute left-3 top-1/2 -translate-y-1/2 mt-5 pointer-events-none">
                                <span className="material-symbols-outlined">attach_money</span>
                            </div>
                        </label>
                    </div>
                </div>
            </main>
            <div className="p-4 bg-background-light dark:bg-background-dark sticky bottom-0">
                <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center rounded-lg h-14 bg-primary text-white text-lg font-bold leading-normal tracking-wide shadow-lg hover:bg-primary/90 transition-colors">Publish
                    Ride
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
                    <MapDisplay
                        setState={setIsOpen}
                        start={start}
                        end={end}
                        startQuery={startQuery}
                        endQuery={endQuery}
                        setTripDuration={setTripDuration}
                        setTripDistance={setTripDistance}
                    />
                </div>
            )}
        </div>
    </>)
}