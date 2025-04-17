// app/client/page.tsx

import ClientList from "@/components/client/ClientList";
// import { getClients } from "@/services/client/clientApi";
import React from "react";

const Client = async () => {
  const getClients = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return data;
  };
  const res = await getClients();
  console.log("🚀 ~ Client ~ res:", res);

  return <ClientList clients={res} />;
};

export default Client;
