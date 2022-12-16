
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import Button from '../../Components/PaymentButton/paymentbutton';
import * as Yup from "yup";
import './login.css'
import { toast } from "react-toastify";
import { getAuthentication } from '../../Services/loginhelper';
import { useDispatch } from 'react-redux';

import { Formik, Form, Field } from 'formik';
import { authSuccess, setLoggedIn } from '../../Redux/userauth';
import { getUserList } from '../../Services/signuphelper';
import { LoginSideImage } from '../../Utils/imagefiles';
export default function LoginScreen() {
    const [loading, setLoading] = useState(false);
    const [passwordType, setPasswordType] = useState("password");
    const [allUsers, setAllUsers] = useState(null)
    const dispatch = useDispatch();


    const loginValidation = Yup.object().shape({
        username: Yup.string()
            .min(1, "Mininum 1 characters")
            .max(15, "Maximum 15 characters")

            .required("You must enter a username"),
        password: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required")
    });

    // Calling function to get user inforamtion from firebase
    const handleSubmit = async (values) => {

        if (allUsers.length > 0) {
            setLoading(true);
            const getUserEmail = allUsers?.find((udx => udx.username === values.username))
            if (getUserEmail !== undefined) {
                const { email, username } = getUserEmail;
                console.log(email, "email", username, "usenrernen");
                if (email && username) {
                    let obj = {
                        email: email,
                        password: values.password,
                    }

                    const response = await getAuthentication(obj)
                    if (response.length > 0) {
                        //sending the user information in store  
                        dispatch(authSuccess(response))
                        dispatch(setLoggedIn(true));
                        toast.success("You are successfully log in!", { theme: "colored" });
                        setLoading(false);
                        return;
                    } else {
                        setLoading(false);

                    }
                    return;
                } else {
                    setLoading(false);
                    toast.error("User doesn't exists!", { theme: "colored" });

                }
                return;
            }
            else {
                setLoading(false);
                toast.error("User doesn't exists!", { theme: "colored" });
                return;
            }



        }
        else {
            setLoading(false);
            toast.error("User doesn't exists!", { theme: "colored" });
            return;

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
    //useEffect to fetch username email address
    useEffect(() => {
        getUserList().then((res) => {
            console.log(res, "res___");
            setAllUsers(res)

        })
    }, [])
    return (
        <>
        <h1 className='mx-4 text-large mb-4 p-2'>Welcome back user!</h1>

        <div class="d-flex justify-content-center">
                 
         <div className='col-md-6'>
            <div className='user-card'>
              
            <img src={LoginSideImage} alt="logo"/>
         </div>
         </div>
         <div className='col-md-6'>

            <Formik initialValues={
                {
                    username: "",
                    password: ""
                }
            }
                validationSchema={loginValidation}
                onSubmit={
                    (values) => handleSubmit(values)
                }>
                {({ errors, touched }) => (
                    <div class="user_card">
                        <div class="d-flex justify-content-center form_container">
   
                            <Form className='form-container'>

                                <div>
                                    {/* <div class="text-center mb-3">
                                        <p>Sign in with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="bi bi-facebook display-7 "></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i className="bi bi-google display-7 "></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i className="bi bi-twitter display-7"></i>
                                        </button>

                                        <button type="button" class="btn btn-link btn-floating mx-1">
                                            <i className="bi bi-github display-7"></i>
                                        </button>
                                    </div> */}

                                    {/* <p class="text-center h6">OR:</p> */}

                                    <div className="form-group mt-4">
                                        <label htmlFor="userName" className='helper-text-label mx-3'>Username</label>
                                        <Field type="text" name="username" className="form-control" id="userName" />

                                        {errors.username && touched.username ? (
                                            <div className='text-danger mx-3 pt-1'>{errors.username}</div>
                                        ) : null}

                                    </div>
                                    <div className='password-container'>


                                        <div className="form-group mt-4 ">
                                            <label htmlFor="userPassword" className='helper-text-label mx-3' mx-3>Password</label>
                                            <Field type={passwordType}
                                                name="password"
                                                className="form-control"
                                                id="userEuserPasswordmail" />

                                        </div>
                                        <i className="bi bi-eye-slash password-eye" onClick={togglePassword}> </i>

                                        {errors.password && touched.password ? (
                                            <div className='text-danger  mx-3 pt-1'>{errors.password}</div>
                                        ) : null}
                                    </div>
                                    <div className="row mt-4">
                                        <div className="col-md-12 d-flex justify-content-strt">


                                            <div className='col-md-6 d-flex justify-content-center'>
                                                <Link to="/login-with-phone">Use phone number instead</Link>
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
                                                <Button type="submit" buttonName='Log in' />
                                            )
                                        } </div>

                                </div>
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
        </>
    )
}
