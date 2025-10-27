import {Route, Routes} from "react-router-dom";
import HomePage from "@/pages/homePage.jsx";
import SignUp from "@/pages/signUp.jsx";
import Login from "@/pages/login.jsx";
import ForgotPassword from "@/pages/forgotPassword.jsx";
import UserDashboard from "@/pages/user_dashboard.jsx";
import AuthCallbackPage from "@/pages/AuthCallbackPage.jsx";

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
            </Routes>
        </>
    )
}