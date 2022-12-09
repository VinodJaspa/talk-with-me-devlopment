import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import CheckoutPage from '../Pages/CheckoutPage/checkout';
import LoginPage from '../Pages/Login/loginmain';
export default function PageRoutes() {
    const isLoggedIn = useSelector((state) => state.userInfo.data);
    console.log(isLoggedIn,"lohhh");
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
        if (isLoggedIn.length) {
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

                </Route>

                <Route element={<PrivateRoute isAuthenticated={isUserLoggedIn} />}>
                    <Route path="payment" element={<CheckoutPage />}>

                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

