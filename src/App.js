import Checkout from './Checkout';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "YOUR-PAYPAL-CLIENT-ID",
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
