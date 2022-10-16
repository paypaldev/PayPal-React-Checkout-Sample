import logo from './logo.svg';
import './App.css';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "YOUR-CLIENT-ID-HERE",
  currency: "USD",
  intent: "capture",
};

function App() {
  
  return (
    <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons style={{ layout: "vertical" }} />
    </PayPalScriptProvider>
  );
}

export default App;
