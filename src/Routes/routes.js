import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import SignUpStepTwo from '../Components/SignUp/steptwo';
import CheckoutPage from '../Pages/CheckoutPage/checkout';
import GetUserEmailPage from '../Pages/GetUserEmailPage/getuseremail';
import LoginPage from '../Pages/Login/loginmain';
import LoginWithPhone from '../Pages/LoginWithPhone/loginwithphone';
import { VerifyLoginOtpScreen } from '../Pages/LoginWithPhone/verifyotp';
import OtpPage from '../Pages/OtpPage/otppage';
import SignUpPage from '../Pages/SignUpPage/signuppage';
import SignUpStepTwoPage from '../Pages/SignUpPage/signupsteptwopage';
import SignUpWithPhonePage from '../Pages/SignUpPage/signupwithphone';
import ThanksSignUpPage from '../Pages/ThanksSignUp/thankssignup';
export default function PageRoutes() {
    const isLoggedIn = useSelector((state) => state.userInfo.isLoggedIn);
    console.log(isLoggedIn, "lohhh");
    const [isUserLoggedIn, setUserLoggedIn] = useState(false)
    function PublicRoute({ isAuthenticated }) {
        if (isAuthenticated)
            return <Navigate to="/payment" replace />;
        return <Outlet />;
    }

    function PrivateRoute({ isAuthenticated }) {
        if (!isAuthenticated) return <Navigate to="/" />;
        return <Outlet />;
    }
    // This will check user login activity
    useEffect(() => {
        if (isLoggedIn) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);

        }
    }, [isLoggedIn])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicRoute isAuthenticated={isUserLoggedIn} />}>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="login-with-phone" element={<LoginWithPhone />} />
                    <Route path="login-otp" element={<VerifyLoginOtpScreen />} />
                    <Route path='sign-up-with-email' element={<SignUpPage />} />
                    <Route path="sign-up-step-two" element={<SignUpStepTwoPage />} />
                    <Route path='success-signup' element={<ThanksSignUpPage />} />
                    <Route path='sign-up-with-phone-number' element={<SignUpWithPhonePage />} />
                    <Route path='verify-otp' element={<OtpPage />} />
                    <Route path="get-user-email" element={<GetUserEmailPage />} />

                </Route>

                <Route element={<PrivateRoute isAuthenticated={isUserLoggedIn} />}>
                    <Route path="payment" element={<CheckoutPage />}>

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

