import React from 'react'

export default function Button({buttonName , type}) {
    return (
        <div className='w-100 mt-4'>
            <button type={type} class="btn btn-dark btn-lg btn-block w-100">{buttonName}</button>
        </div>
    )
}
