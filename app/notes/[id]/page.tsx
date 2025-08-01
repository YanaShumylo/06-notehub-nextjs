import { getSingleNote } from "@/lib/api";
import { QueryClient, HydrationBoundary, dehydrate, } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";


type Props = {
  params: Promise<{ noteId: string }>
}

const NoteDetails = async ({ params }: Props) => {
  const { noteId } = await params

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => getSingleNote(noteId),
  })
  // const note = await getSingleNote(noteId)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  )
}

export default NoteDetails


