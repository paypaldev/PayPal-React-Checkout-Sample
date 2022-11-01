![PayPal Developer Cover](https://github.com/paypaldev/.github/blob/main/pp-cover.png)
  <a href="https://twitter.com/paypaldev" target="_blank">
    <img alt="Twitter: PayPal Developer" src="https://img.shields.io/twitter/follow/paypaldev?style=social" />
  </a>
# How To Add Checkout Payment In React with PayPal

This sample app shows how to add checkout payments to your React application using the [react-paypal-js npm](https://www.npmjs.com/package/@paypal/react-paypal-js) package.

## Installation

To install the react-paypal-js npm package run the following command inside of your project.

`npm install @paypal/react-paypal-js`

If you have any issues with this npm package, please report them in its [GitHub repo](https://github.com/paypal/react-paypal-js/issues).

## Usage
The PayPal NPM package consists of 2 main parts:

- The Context Provider, this `<PayPalScriptProvider/>` is responsible for the PayPal JS SDK script. This provider uses the native [React Context API](https://reactjs.org/docs/context.html) for managing state and communicating with child components. It also supports reloading the script when parameters change.

- The PayPal SDK Components, components like `<PayPalButtons/>` are used to render the UI for PayPal products served by the JS SDK.

### App.js

This component is responsible for loading the PayPal script and rendering the `<Checkout/>` component.

At the top of the `App.js` file we added `PayPalScriptProvider` to start using it in our component:

```javascript
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
```

In this file we also added the `initialOptions` object, these options can be changed with other configuration parameters. To learn more about the other configuration options look at the [PayPal SDK docs](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-configuration/).

```javascript
const initialOptions = {
  "client-id": "YOUR-CLIENT-ID-HERE",
  currency: "USD",
  intent: "capture",
};
```
You can find your client ID and secret by logging in to the [PayPal Developer Dashboard](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications&_ga=1.9387580.841672670.1664266268.)

Finally, inside the `App.js`, we added the `<PayPalScriptProvider/>`. Notice we have inside the provider the `<Checkout/>` component where we have the PayPal components.

```jsx
<PayPalScriptProvider options={initialOptions}>
        <Checkout/>
</PayPalScriptProvider>
```

See the `App.js` file to view the final code.

### Checkout.js

This file is responsible for loading the PayPal components such as the PayPal button. 

At the top of the `Checkout.js` file, we added the following line to include the `PayPalButtons` and the `usePayPalScriptReducer`.

```javascript
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
```

The `usePayPalScriptReducer()` will help us show a spinner when the PayPal Script is loading and can be used to change the values of the options of the PayPal SDK and at the same time reload the SDK with the updated parameters.

In this same file, we added the following line of code to start using the `usePayPalScriptReducer()`. 

```javascript
const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
```

The PayPal Script has several loading states and with the `usePayPalScriptReducer()` we can track it in an easier way. This state can be used to show a loading spinner while the script loads or an error message if it fails to load.

Loading states:
- isInitial - not started (only used when passing deferLoading={true})
- isPending - loading (default)
- isResolved - successfully loaded
- isRejected - failed to load

In this sample app, we used the `isPending` to render the rest of the UI including the `PayPalButtons`.

```javascript
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
            )
    }
```

In this code, you will see the `<PayPalButtons/>` were added as well. In this example, we are passing 3 props to our PayPal button component.

- [style](https://developer.paypal.com/sdk/js/reference/#style): This prop allows you to style the PayPal button E.g color, shape, layout, and more.
- [createOrder](https://developer.paypal.com/docs/api/orders/v2/#orders-create-request-body): This prop allows you to create the request of your order with the following properties: item_total, purchase_units, and more.
- [onApprove](https://developer.paypal.com/docs/api/orders/v2/#orders_get): This prop allows doing something with the order details after it has been created.

See the `Checkout.js` file to view the final code.

## Run Sample App

In the `App.js` file, replace the text value of the `client-id` property of the `initialOptions` object with your own client ID.

You can find your client ID and secret by logging in to the [Developer Dashboard](https://www.paypal.com/signin?returnUri=https%3A%2F%2Fdeveloper.paypal.com%2Fdeveloper%2Fapplications&_ga=1.9387580.841672670.1664266268.)

Inside your project run in the terminal `npm start` to run the ReactJS application.

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Sample Card
Card Type: `Visa`

Card Number: `4032039534213337`

Expiration Date: `03/2026`

CVV: `952`

## PayPal Developer Community

The PayPal Developer is a community of developers who work with PayPal  and products. The community members can contribute to open source, expand their network and knowledge across different PayPal technologies, and improve PayPal products and the developer experience.

* Website: [developer.paypal.com](https://developer.paypal.com)
* Twitter: [@paypaldev](https://twitter.com/paypaldev)
* Github:  [@paypal](https://github.com/paypal)



