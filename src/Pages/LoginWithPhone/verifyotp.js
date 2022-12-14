
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authSuccess, setLoggedIn } from '../../Redux/userauth';
import { saveUserInformation } from '../../Services/signupwithphone';
export function VerifyLoginOtpScreen() {
    const [otp, setOtp] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
 
    const dispatch = useDispatch()
    const handleChange = (otp) => {
        setOtp(otp);
    }
    const userNumber = localStorage.getItem("mobileNumber");
    const verificationPending = window.verfiyOtp;

    const last4Str = String(userNumber).slice(-4);
    const verfiyOtp = async () => {
        if (verificationPending !== undefined) {
            if (otp && otp.length === 6) {
                try {
                    setLoading(true);
                    const res = await window.verfiyOtp.confirm(otp);
                    if (res.user) {
                        const saveUser = await saveUserInformation(res);
                        if (saveUser) {
                            setLoading(false);
                            toast.error("You are succefully logged in!", { theme: "colored" });

                            dispatch(authSuccess([res.user]))
                            dispatch(setLoggedIn(true));
                        }
                    }

                } catch (err) {
                    console.log(err,"ererere");
                    setLoading(false);

                    toast.error(err, { theme: "colored" });
                }

            } else {
                toast.error("Please provide otp!", { theme: "colored" });

            }
        } else {
            toast.error("Your session is over please try again!", { theme: "colored" });

            navigate("../login-with-phone");

        }



    }

    return (
        <div className="verifyDiv child">
            <p className="p1">We've sent you a code</p>
            <p className="p2 mt-4">
                Enter the six digit code sent to your phone number ending with{last4Str}`
            </p>
            <div className="otpElements">
                <p className="p3">Enter your Code here</p>
                <div className="otp ">
                    <OtpInput
                        onChange={handleChange}
                        inputStyle="inputStyle"
                        value={otp}
                        isInputNum={true}
                        shouldAutoFocus={true}
                        numInputs={6}
                        separator={<span></span>}
                    />
                </div>
            </div>
            {
                loading ? (
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                        </div>


                    </div>
                ) :
                    <div className='w-100 mt-4'>
                        <button onClick={verfiyOtp} class="btn btn-dark btn-lg btn-block w-100">Verify</button>
                    </div>
            }

        </div>

    );

}