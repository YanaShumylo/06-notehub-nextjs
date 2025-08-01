import { getSingleNote } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

type PageDetailsProps = {
params: { id: string };}

export default async function NoteDetailsPage ({ params }: PageDetailsProps) {
    const id = params.id;
    const queryClient = new QueryClient();

await queryClient.prefetchQuery({
queryKey: ["note", id],
queryFn: () => getSingleNote(id),  });

    return (<HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient/>
    </HydrationBoundary>);
}


