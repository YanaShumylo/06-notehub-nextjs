"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from 'next/navigation';
import { fetchNoteById } from "@/lib/api";
import css from "../../../components/NoteDetails/NoteDetails.module.css";

const NoteDetailsClient = () => {
	 const params = useParams();
  const id = params?.id?.toString();

const { data: note, isLoading, error } = useQuery({
queryKey: ["note", id],
queryFn: () => fetchNoteById(id!),
	refetchOnMount: false,
	enabled: !!id,
});

if (isLoading) return <p>Loading, please wait...</p>;

if (error || !note) return <p>Something went wrong.</p>;

const formattedDate = note.updatedAt
? `Updated at: ${note.updatedAt}`
: `Created at: ${note.createdAt}`;

return (
<div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>{note.title}</h2>
	  </div>
	  <p className={css.content}>{note.content}</p>
	  <p className={css.date}>{formattedDate}</p>
	</div>
        </div>
);
};

export default NoteDetailsClient;

