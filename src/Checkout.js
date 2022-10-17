import React, { useState } from 'react';
import './Checkout.css';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

const Checkout = () => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    return (
        <div className="checkout">
            {isPending ? <p>LOADING...</p> : (
                <>
                    <select value={currency} onChange={onCurrencyChange}>
                            <option value="USD">💵 USD</option>
                            <option value="EUR">💶 Euro</option>
                    </select>
                    <PayPalButtons 
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: "8.99",
                                        },
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                alert(`Transaction completed by ${name}`);
                            });
                        }}
                    />
                </>
            )}
        </div>
    );
}

export default Checkout;