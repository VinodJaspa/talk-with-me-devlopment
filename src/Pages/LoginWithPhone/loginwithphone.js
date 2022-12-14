import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";


import { Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { SignUpWithPhoneHelper } from '../../Services/signupwithphone';

import Button from '../../Components/PaymentButton/paymentbutton';
import { PhoneNumber } from '../../Components/PhoneInput/phoneInput';
import { getUserList } from '../../Services/signuphelper';
export default function LoginWithPhone() {
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState(null)

    const navigate = useNavigate();

    const phoneSchema = Yup.string().matches(new RegExp('[+0-9]{14}'))
    const signUpValidation = Yup.object().shape({

        // phoneNumber: Yup.string().matches(phoneSchema, 'Phone number is not valid'),
        // username: Yup.string().required("Required"),

    });

    // Calling function to get user inforamtion from firebase
    const handleSubmit = async (values) => {
        if (values.phoneNumber !== '') {
            const getUserEmail = allUsers?.find((udx => udx.phoneNumber === values.phoneNumber))
            if (getUserEmail !== undefined) {
                const { phoneNumber, username } = getUserEmail;
                console.log(phoneNumber,"phoneNumber" ,username,"usename");
                if (phoneNumber && username) {
                    setLoading(true);
                    const res = await SignUpWithPhoneHelper(values)
                    localStorage.setItem("mobileNumber", values.phoneNumber);
                    if (res) {
                        setLoading(false);
                        toast.success("An otp has been sent to your mobile number", { theme: "colored" })
                        navigate("../login-otp");
                        return;
                    }
                    else {
                        setLoading(false);
                    }
                    return;
                } else {
                    setLoading(false);
                    toast.error("This phone number doesn't exists!", { theme: "colored" });
                    return;

                }
            }
            else {
                setLoading(false);
                toast.error("This phone number doesn't exists!", { theme: "colored" });
                return;

            }

        }
        else {
            setLoading(false);
            toast.error("Please provide phone number!", { theme: "colored" });
            return;

        }



    }
    //useEffect to fetch username email address
    useEffect(() => {
        getUserList().then((res) => {
            console.log(res, "res___");
            setAllUsers(res)

        })
    }, [])

    return (
        <div className='container-fluid'>


            <div className='container  mt-6'>
                <div className='login-wrapper'>
                    <div class="d-flex justify-content-center container">

                        <Formik initialValues={
                            {
                                phoneNumber: "",

                            }
                        }
                            validationSchema={signUpValidation}
                            onSubmit={
                                (values) => handleSubmit(values)
                            }>
                            {({ errors, touched }) => (
                                <div class="user_card">
                                    <div class="d-flex justify-content-center">
                                        <div class="brand_logo_container">
                                            <img src="https://pbs.twimg.com/profile_images/562941964371640320/iKyya_R5_400x400.jpeg" class="brand_logo" alt="Logo" />
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center form_container">

                                        <Form className='form-container'>

                                            <div>
                                                <div className="form-group mt-4">
                                                    <label htmlFor="phoneNumberInput" className='helper-text-label'>Mobile Number</label>
                                                    {/* <Field type="tel" name="phoneNumber" className="form-control" id="phoneNumberInput" /> */}
                                                    <PhoneNumber
                                                        type="tel"
                                                        name="phoneNumber"
                                                        className="form-control"
                                                        id="phoneNumberInput"
                                                    // component={PhoneNumber}
                                                    />


                                                    {errors.phoneNumber && touched.phoneNumber ? (
                                                        <div className='text-danger'>{errors.phoneNumber}</div>
                                                    ) : null}

                                                </div>


                                                <div className="row mt-4">
                                                    <div className="col-md-12 d-flex justify-content-strt">


                                                        <div className='col-md-6 d-flex justify-content-start'>
                                                            <Link to="/">Login With Username</Link>
                                                        </div>

                                                    </div>

                                                </div>




                                            </div>
                                            <div className='button-container'>
                                                {
                                                    loading ? (
                                                        <div className="text-center">
                                                            <div className="spinner-border" role="status">
                                                            </div>


                                                        </div>
                                                    ) : (
                                                        <Button type="submit" buttonName='Continue' />
                                                    )

                                                }
                                            </div>

                                            <div

                                                id="recaptcha-container"
                                                class="justify-center flex"
                                            ></div>
                                            <div className="row mt-4">

                                                <div className='col-md-12 text-center'>
                                                    <Link to="/sign-up-with-email">Don't have account just create one?</Link>
                                                </div>

                                            </div>

                                        </Form>

                                    </div>
                                </div>
                            )}
                        </Formik>
                    </div>

                </div>

            </div>
        </div>
    )
} 
