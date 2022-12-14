import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";

import { Field, Form, Formik } from 'formik';
import Button from '../PaymentButton/paymentbutton';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn } from '../../Redux/userauth';
import { addUserEmail } from '../../Services/signupwithphone';

export default function Stepthree() {
    const [loading, setLoading] = useState(false);
    const userdata = useSelector((state) => state.userInfo.data[0]);
    console.log(userdata,"userdata");
    const { createdAt } = userdata;
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const signUpValidation = Yup.object().shape({
        email: Yup.string().email("Must be a valid email").min(2, "Too Short!").max(50, "Too Long!").required("Required"),

    });

    // Calling function to get user inforamtion from firebase
    const handleSubmit = async (values) => {
        if (values.email) {
            const update = await addUserEmail(values.email, createdAt)
            if (update) {
                toast.success("Your email adress is added succesfully", { theme: "colored" })
                setLoading(false);

                dispatch(setLoggedIn(true));
            } else {
                setLoading(false);

            }
        }
    }


    return (
        <div class="d-flex justify-content-center container">

            <Formik initialValues={
                {

                    email: "",

                }
            }
                validationSchema={signUpValidation}
                onSubmit={
                    (values) => handleSubmit(values)
                }>
                {({ errors, touched }) => (
                    <div class="user_card">

                        <div class="d-flex justify-content-center form_container">
                            <Form className='form-container'>

                                <h1>Tell us about yourself</h1>
                                <p>For a personalized linktree experience </p>

                                <div className="form-group mt-4">
                                    <label htmlFor="userEmail" className='helper-text-label'>Email</label>
                                    <Field type="email" name="email" className="form-control" id="userEmail" />

                                    {errors.email && touched.email ? (
                                        <div className='text-danger'>{errors.email}</div>
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

