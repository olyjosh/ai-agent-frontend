import React, { useState } from 'react';
import { PaystackButton } from 'react-paystack';
import { useSearchParams } from "react-router-dom";
import './App.css';


const DonationPage = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("email"));
  const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const [email, setEmail] = useState(searchParams.get("email"));
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState(5000)


  const resetForm = () => {
    setEmail(searchParams.get("email"));
    setName('');
    setPhone('');
    setAmount(5000)
  };

  const componentProps = {
    email,
    amount,
    metadata: {
      name,
      phone,
    },
    publicKey,
    text: 'Donate NGN'+ amount,
    onSuccess: ({ reference }) => {
      alert(
        `Your Donation was successful! Transaction reference: ${reference}`
      );
      resetForm();
    },
    onClose: () => alert("Kindly support the party by donating!"),
  };

  return (
    <div className="App">
      <div className="container">
        <div className="item">
          <div className="overlay-effect"></div>
          <img
            className="item-image"
            src="https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=2873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="product"
          />
          <div className="item-details">
            <p className="item-details__title">You are donating...</p>
            <p className="item-details__amount">NGN {amount}</p>
          </div>
        </div>
        <div className="checkout">
          <div className="checkout-form">
            <div className="checkout-field">
              <label>Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Email</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Phone</label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="checkout-field">
              <label>Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <PaystackButton className="paystack-button" {...componentProps} amount={amount*100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;