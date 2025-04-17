// app/client/[id]/page.js

import { getClientTable, getSingleClient } from "@/services/client/clientApi";
import SingleClientInfo from "@/components/client/single-cilent/SingleClientInfo";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";

const SingleClient = async ({ params, searchParams }) => {
  const { id } = await params;
  const { tab } = await searchParams;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["single-client", id],
    queryFn: () => getSingleClient(id),
  });

  await queryClient.prefetchQuery({
    queryKey: ["single-client-table", id],
    queryFn: () => getClientTable(id, { tabName: tab }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SingleClientInfo id={id} tab={tab} />
    </HydrationBoundary>
  );
};

export default SingleClient;
