import PhoneInput from 'react-phone-number-input'
import { useState } from 'react'
import 'react-phone-number-input/style.css'
import { useField } from "formik";
export function PhoneNumber({ className, id,
    ...props }) {
    const [field, meta, helpers] = useField(props.name);
    const [value, setValue] = useState()
    console.log(field, "eield", value);
    return (
        <PhoneInput
            {...props}
            {...field}
            value={field.value}
            defaultCountry="US"
            maxLength={14}
            onChange={(value) => {
                helpers.setValue(value);
            }}
            className={className}
            id={id}

        />
    )
}
