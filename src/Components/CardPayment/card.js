import React from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";

export default class PaymentForm extends React.Component {
    state = {
        cvc: "",
        expiry: "",
        focus: "",
        name: "",
        number: "",
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    };

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    };

    render() {
        return (
            <div id="PaymentForm" className="w-100 mt-4">
                {/* <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                /> */}
                <form>
                    <div className="form-group ">
                        <label className="helper-text-label" for="CardFormControlInput">Card Information</label>
                        <input
                            class="form-control"
                            id="CardFormControlInput"
                            type="tel"
                            name="number"
                            placeholder="Card Number"
                            onChange={this.handleInputChange}
                            onFocus={this.handleInputFocus}
                        />
                        <div className="d-flex  w-100 ">
                            <span className="expiration d-flex w-50 no-border">
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM"
                                    maxlength="2"
                                    size="2"
                                    class="form-control custom "
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                                <span style={{ border: "none", width: '10px', marginRight: '10px', marginLeft: '10px' }} class="form-control  ">/</span>
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="YY"
                                    maxlength="2"
                                    size="2"

                                    class="form-control"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </span>
                            <span className="expiration d-flex w-50 no-border">
                                <input
                                    type="text"
                                    class="form-control"
                                    name="cvc"
                                    placeholder="cvc"
                                    onChange={this.handleInputChange}
                                    onFocus={this.handleInputFocus}
                                />
                            </span>



                        </div>
                    </div>


                </form>
            </div>
        );
    }
}
