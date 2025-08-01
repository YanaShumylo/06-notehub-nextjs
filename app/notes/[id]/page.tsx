import { getSingleNote } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

export default async function NoteDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", params.id],
    queryFn: () => getSingleNote(params.id),
  });

    return (<HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient/>
    </HydrationBoundary>);
}


