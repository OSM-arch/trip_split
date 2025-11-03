export default function suggestPrice(distanceKm, durationMin) {
    if (distanceKm && durationMin) {
        const baseFare = 15;
        const costPerKm = distanceKm > 50 ? 0.5 : 1.2;
        const costPerMin = 0.1;

        return Math.round(baseFare + (distanceKm * costPerKm) + (durationMin * costPerMin));
    }else {
        return null;
    }
}