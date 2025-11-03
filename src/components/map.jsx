import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useSelector } from "react-redux";
import { userSelector } from "@/store/selectors/userSelector.js";

// Custom red marker icon
const redMarker = new L.Icon({
    iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function Routing({ start, end, setRouteInfo, setTripDuration, setTripDistance }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !start || !end) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(start.lat, start.lon), L.latLng(end.lat, end.lon)],
            lineOptions: {
                styles: [{ color: "red", weight: 4 }],
            },
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            show: false,
        })
            .on("routesfound", (e) => {
                const route = e.routes[0];
                const distanceKm = (route.summary.totalDistance / 1000).toFixed(2);
                const durationMin = (route.summary.totalTime / 60).toFixed(1);
                setRouteInfo({ distanceKm, durationMin });
                setTripDuration(durationMin);
                setTripDistance(distanceKm);
            })
            .addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, start, end, setRouteInfo, setTripDuration, setTripDistance]);

    return null;
}

export default function MapDisplay({
                                       setState,
                                       start,
                                       end,
                                       startQuery,
                                       endQuery,
                                       setTripDuration,
                                       setTripDistance
                                   }) {
    const user = useSelector(userSelector);
    const position = [user.address?.latitude, user.address?.longitude];
    const [routeInfo, setRouteInfo] = useState(null);

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start p-4 sm:justify-center sm:p-6">
            {/* Close button */}
            <div className="absolute top-5 right-5 z-[1000]">
                <button
                    onClick={() => setState(false)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-lg px-4 py-3 rounded transition-all duration-300 ease-in-out"
                >
                    x
                </button>
            </div>

            {/* Map wrapper */}
            <div className="w-full max-w-4xl rounded-xl bg-card-light dark:bg-card-dark p-6 shadow-lg sm:p-8">
                <div className="w-full h-[500px] rounded-lg overflow-hidden">
                    <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={true}
                        className="w-full h-full rounded-lg"
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        {/* Start marker */}
                        {start && (
                            <Marker position={[start.lat, start.lon]} icon={redMarker}>
                                <Popup>Start: {startQuery}</Popup>
                            </Marker>
                        )}

                        {/* End marker */}
                        {end && (
                            <Marker position={[end.lat, end.lon]} icon={redMarker}>
                                <Popup>End: {endQuery}</Popup>
                            </Marker>
                        )}

                        {/* Real routing with distance */}
                        {start && end && (
                            <Routing
                                start={start}
                                end={end}
                                setRouteInfo={setRouteInfo}
                                setTripDuration={setTripDuration}
                                setTripDistance={setTripDistance}
                            />
                        )}

                        {/* Default user marker */}
                        {!start && !end && position && (
                            <Marker position={position}>
                                <Popup>Your location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
                {/* Distance + Duration Info */}
                {routeInfo && (
                    <div className="px-4 py-2 rounded-lg shadow text-sm text-gray-900">
                        <p>
                            🛣 <strong>Distance:</strong> {routeInfo.distanceKm} km
                        </p>
                        <p>
                            ⏱ <strong>Duration:</strong> {routeInfo.durationMin} min
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}