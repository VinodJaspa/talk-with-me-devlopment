import React from 'react'



function CountrySelector({ handleChange, handleBlur, zip }) {

  return (
    <div class="form-group mt-4">
      <label htmlFor="DescriptionFormControlTextarea1" className='helper-text-label'>Country or orgin</label>
      <select class="selectpicker form-control " defaultValue={1}>
        <option value='1'>US</option>
        <option value='2'>India</option>
        <option value='3'>Pakistan</option>
      </select>


      <input
        className='form-control no-border'
        type="text"
        name="zipcode"
        placeholder='ZIP'
        onChange={handleChange}
        onBlur={handleBlur}
        value={zip} />

    </div>


  )
}

export default CountrySelector