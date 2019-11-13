import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";

export default function Plaid() {
  const onSuccess = (token, metadata) => {
    console.log(token);
    axios
      .post("https://development.plaid.com/item/public_token/exchange", {
        public_token: token,
        client_id: "5abd2ae3bdc6a443280310c0",
        secret: "965e013604ae1632c03d0b37f2bc9d"
      })
      .then(res => {
        console.log(res.data);
      });
  };

  const onExit = () => {};

  return (
    <PlaidLink
      clientName="Plaid Test App"
      env="development"
      product={["auth", "transactions"]}
      publicKey="96df0416badcac0a0376959bb1501f"
      onExit={onExit}
      onSuccess={onSuccess}
    >
      Open Link
    </PlaidLink>
  );
}
