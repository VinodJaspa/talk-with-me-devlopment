import React, { useMemo, useState } from 'react'
import { Formik } from 'formik';
import UserCard from '../../Components/UserCard/usercard';
import DescriptionBox from '../../Components/Description/description';
import Inputbox from '../../Components/InputBox/inputbox';
import PaymentForm from '../../Components/CardPayment/card';
import CountrySelector from '../../Components/CountryDropdown/countrydropdown';
import Paymentbutton from '../../Components/PaymentButton/paymentbutton';
import Select from 'react-select'
import countryList from 'react-select-country-list'
import { customStyles } from '../../Components/CountryDropdown/customStyle';

export default function CheckoutPage() {
    const [value, setValue] = useState({})
    const options = useMemo(() => countryList().getData(), [])
    console.log(options, "oppttt");

    const changeHandler = (value) => {
        // setValue(value)

    }

    return (
        <div className='container-fluid m-4'>
            <div>
                <h1 className='theme-font'>talk with me</h1>
            </div>
            <div className='d-flex w-100 text-start'>
                <div className='container'>
                    <Formik
                        initialValues={{ email: '', description: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                alert(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <UserCard />

                                <DescriptionBox name="description" />

                                {errors.description && touched.description && errors.description}

                                <Inputbox
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password} />



                                {errors.email && touched.email && errors.email}
                                <PaymentForm />
                                <div class="form-group mt-4">
                                    <label htmlFor="nameFormControlInput1" className='helper-text-label'>Name on card</label>
                                    <input type="text" class="form-control" id="nameFormControlInput1"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password} />
                                </div>

                                {errors.name && touched.name && errors.name}
                                <CountrySelector />
                                <div className="form-group mt-4 text-center m-auto">
                                    <span className='lead'>Free returns and exchanges</span>

                                </div>

                                <Paymentbutton type="submit" disabled={isSubmitting} buttonName='Pay $10.00' />



                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
