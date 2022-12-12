import React from 'react'
import './thanks.css';
export default function ThanksWindow() {
    const userEmail = localStorage.getItem("emailForSignIn");
    return (

        <div class="form-group m-auto">
            <div className='child'>
                <h1>Thanks for signing up</h1>
                <p>To verify your account click on the link we have sent to you inbox </p>
               
                <p>{userEmail}</p>
                </div>
        </div>

    )
}
