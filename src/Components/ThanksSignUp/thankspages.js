import React from 'react'

export default function ThanksSignUpPage() {
    const userEmail = localStorage.getItem("emailForSignIn");
    return (

        <div class="form-group mt-4">
            <>
                <h1>Thanks for signing up</h1>
                <p>To verify your account click on the link we have sent to you inbox </p>
                <br />
                <p>{userEmail}</p>
            </>
        </div>

    )
}
