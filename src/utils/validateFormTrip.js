export default function validateFormTrip(startValue, endValue, dateValue, seatsValue, priceValue) {

    const error = [];

    // Check empty fields
    if (!startValue || !endValue) {
        error.push("Please select both start and destination points.");
    }

    if (!dateValue) {
        error.push("Please select a valid departure date.");
    }

    // Date must be in the future
    const selectedDate = new Date(dateValue);
    const now = new Date();
    if (selectedDate < now) {
        error.push("The departure date must be in the future.");
    }

    // Seats validation
    if (!seatsValue || isNaN(seatsValue) || seatsValue <= 0) {
        error.push("Please enter a valid number of seats.");
    }

    // Price validation
    if (!priceValue || isNaN(priceValue) || priceValue <= 0) {
        error.push("Please enter a valid price greater than 0.");
    }

    if(error.length > 0) {
        return error;
    }

    return null;
}