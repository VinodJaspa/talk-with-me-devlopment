
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from '../../Components/PaymentButton/paymentbutton';
import './signup.css';



import { Field, Form, Formik } from 'formik';
import { createUser } from '../../Services/signuphelper';
import { useDispatch } from 'react-redux';
import { authSuccess } from '../../Redux/userauth';
export default function SignUpStepTwo() {
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useDispatch();


    const signUpValidation = Yup.object().shape({

        password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required")
    });

    // Calling function to get user inforamtion from firebase
    const handleSubmit = async (values) => {
        setLoading(true);
        let obj = {
            ...state,
            ...values
        }
        const res = await createUser(obj)
        console.log(res, "ress");

        if (res) {
            setLoading(false);
            dispatch(authSuccess([res]));

            navigate("../success-signup");
            return;
        } else {
            setLoading(false);
        }

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


                                <div className='mt-4 button-container'>
                                    {
                                        loading ? (
                                            <div className="text-center">
                                                <div className="spinner-border" role="status">
                                                </div>


                                            </div>
                                        ) : (
                                            <Button type="submit" buttonName='Create account' />
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
