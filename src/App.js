import Checkout from './Checkout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "ASBRTbGDIp10_WxZj0lR6P7CymT4JEgkdP_B-x5k6jRxZ0B_eW8_Cl3c8VPqVQlBb4GIgYAS9gl9-bXP",
  currency: "USD",
  intent: "capture",
};

function App() {
  return (
    <PayPalScriptProvider options={initialOptions}>
        <Checkout/>
    </PayPalScriptProvider>
  );
}

export default App;
