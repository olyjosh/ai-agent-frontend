import React, { useState } from 'react';
import { PaystackButton, usePaystackPayment } from 'react-paystack';
import { useSearchParams } from "react-router-dom";
import './App.css';
import { useEffect } from 'react';


const App = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [success, setSuccess] = useState(false)
  console.log(searchParams.get("email"));
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

  // you can call this function anything
  const onSuccess = (reference) => {
    // Implementation for whatever you want to do with reference and after success call.
    setSuccess(true)

  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
    close()
  }

  const config = {
    reference: (new Date()).getTime().toString(),
    email: searchParams.get("email"),
    amount: 20000, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey,
    onSuccess,
    onCancel: onClose
  };

  const initializePayment = usePaystackPayment(config);

  useEffect(()=>{
    if(searchParams.get("email"))
      initializePayment({onSuccess, onClose})
    else {
      alert("Email Validation Failed; Member's email is required to make payment")
      close();
    }
  }, [])

  return (
    <div className="App">
      <div className="container">
        
        <div className="checkout">
          <div className="checkout-2"> 
            <img alt="" src="https://aacparty.com/wp-content/uploads/2019/12/AAC-143-1-2.png"
                                height="50px" />
          </div>

          { success && <h2 className="success-text">Thank You for Paying</h2> }
          {/* { !success && <h2 className="error-text">Payment not completed</h2> } */}
        </div>
      </div>
    </div>
  );
};

export default App;