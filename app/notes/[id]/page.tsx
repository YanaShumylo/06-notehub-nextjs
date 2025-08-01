import { getSingleNote } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface PageProps {
params: { id: string };}

export default async function NoteDetailsPage ({ params }: PageProps) {
    const id = params.id;
    const queryClient = new QueryClient();

await queryClient.prefetchQuery({
queryKey: ["note", id],
queryFn: () => getSingleNote(id),  });

    return (<HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient/>
    </HydrationBoundary>);
}


