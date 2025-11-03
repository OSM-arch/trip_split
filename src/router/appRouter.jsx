import {Route, Routes} from "react-router-dom";
import HomePage from "@/pages/homePage.jsx";
import SignUp from "@/pages/signUp.jsx";
import Login from "@/pages/login.jsx";
import ForgotPassword from "@/pages/forgotPassword.jsx";
import UserDashboard from "@/pages/user_dashboard.jsx";
import AuthCallbackPage from "@/pages/AuthCallbackPage.jsx";
import OfferRide from "@/pages/offer_ride.jsx";
import MyRides from "@/pages/myRides.jsx";
import FindRide from "@/pages/find_ride.jsx";
import MyBookings from "@/pages/myBookings.jsx";
import RidesRequests from "@/pages/rides_requests.jsx";

export default function AppRouter() {

    return (
        <>
            <Routes>
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot_password" element={<ForgotPassword />} />
                <Route path="/user_dashboard" element={<UserDashboard />} />
                <Route path="/offer_ride" element={<OfferRide />}/>
                <Route path="/find_ride" element={<FindRide />}/>
                <Route path="/myrides" element={<MyRides />}/>
                <Route path="/mybookings" element={<MyBookings />}/>
                <Route path="/rides_requests" element={<RidesRequests />}/>
            </Routes>
        </>
    )
}