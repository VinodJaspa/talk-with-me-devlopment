import React from 'react'

export default function Button({buttonName , type}) {
    return (
        <div className='w-100 mt-2'>
            <button type={type} class="btn btn-dark btn-sm rounded-pill w-100">{buttonName}</button>
        </div>
    )
}
