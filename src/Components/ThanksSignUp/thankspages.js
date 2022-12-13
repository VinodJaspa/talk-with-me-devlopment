import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { authSuccess, setLoggedIn } from '../../Redux/userauth';
import './thanks.css';
export default function ThanksWindow() {
    const userEmail = localStorage.getItem("emailForSignIn");

    const { state } = useLocation()
    const dispatch = useDispatch();
    const saveInfo = () => {
        console.log(state,"steee");
        dispatch(setLoggedIn(true));

    }
    return (

        <div class="form-group m-auto">
            <div className='child' style={{ border: "none" }}>
                <h1>Thanks for signing up</h1>
                <p>To verify your account click on the link we have sent to you inbox </p>

                <p>{userEmail}</p>
                <div className='w-100 mt-4'>
                    <button onClick={saveInfo} class="btn btn-dark btn-lg btn-block w-100">Contine to my Link tree</button>
                </div>
            </div>

        </div>

    )
}
