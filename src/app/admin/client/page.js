import ClientList from "@/components/client/ClientList";
import { getClients } from "@/services/client/clientApi";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

const Client = async () => {
  const queryClient = new QueryClient();

  // Prefetch any data you need here
  await queryClient.prefetchQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientList />
    </HydrationBoundary>
  );
};

export default Client;
