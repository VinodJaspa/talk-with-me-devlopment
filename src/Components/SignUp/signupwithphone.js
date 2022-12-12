
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from '../../Components/PaymentButton/paymentbutton';
import './signup.css';



import { Field, Form, Formik } from 'formik';
import { createUser } from '../../Services/signuphelper';
import { toast } from 'react-toastify';
import { PhoneNumber } from '../PhoneInput/phoneInput';
export default function SignUpWithPhone() {
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();


    const signUpValidation = Yup.object().shape({
        // phoneNumber: Yup.string().phoneNumber("Must be a valid email").min(10, "Too Short!").max(13, "Too Long!").required("Required"),
        // username: Yup.string().username("Must be a valid username").min(2, "Too Short!").max(50, "Too Long!").required("Required"),
        password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required")
    });

    // Calling function to get user inforamtion from firebase
    const handleSubmit = async (values) => {
        toast.warning("We are working on it", { theme: "colored" })
        // setLoading(true);
        // const res = await createUser(values)
        // console.log(res, "ress___");
        // if (res === true) {
        //     setLoading(false);
        //     navigate("../success-signup");
        //     return;
        // } else {
        //     setLoading(false);
        // }

    }
    // Function to show and hide password
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }

        setPasswordType("password");
    };
    return (
        <div class="d-flex justify-content-center container">

            <Formik initialValues={
                {
                    username: "",
                    phoneNumber: "",
                    password: ""
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
                                        <label htmlFor="userName" className='helper-text-label'>User Name</label>
                                        <Field type="text" name="username" className="form-control" id="userName" />

                                        {errors.username && touched.username ? (
                                            <div className='text-danger'>{errors.username}</div>
                                        ) : null}

                                    </div>
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
                                    <div className='password-container'>


                                        <div className="form-group mt-4 ">
                                            <label htmlFor="userPassword" className='helper-text-label'>Password</label>
                                            <Field type={passwordType}
                                                name="password"
                                                className="form-control"
                                                id="userPassword" />

                                        </div>
                                        <i className="bi bi-eye-slash password-eye" onClick={togglePassword}> </i>

                                        {errors.password && touched.password ? (
                                            <div className='text-danger'>{errors.password}</div>
                                        ) : null}
                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-md-12 d-flex justify-content-strt">


                                            <div className='col-md-6 d-flex justify-content-start'>
                                                <Link to="/sign-up-with-email">Use email instead</Link>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="row mt-4">
                                        <div className="col-md-12 justify-content-start">
                                            <div className="form-check mb-3 mb-md-0">
                                                <input className="form-check-input" type="checkbox" value="" id="loginCheck" />
                                                <label className="form-check-label text-muted" htmlFor="loginCheck">By clicking this you are agree to <u className='text-bold'>Terms and condtions </u>
                                                    of this site. </label>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                                <div className='mt-4 button-container'>
                                    {
                                        loading ? (
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                </div>


                                            </div>
                                        ) : (
                                            <Button type="submit" buttonName='Continue' />
                                        )
                                    } </div>


                            </Form>
                        </div>
                    </div>
                )}
            </Formik>
        </div>
    )
}