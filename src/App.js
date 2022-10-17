import Checkout from './Checkout';
import './App.css';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "YOUR-CLIENT-ID-HERE",
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
