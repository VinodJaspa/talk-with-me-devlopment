import React from 'react'

export default function Inputbox() {
    return (
        <div>
            <div class="form-group mt-4">
                <label htmlFor="exampleFormControlInput1" className='helper-text-label'>Email address</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
        </div>
    )
}
