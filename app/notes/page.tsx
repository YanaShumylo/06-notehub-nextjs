// import dynamic from "next/dynamic";
import css from "../../components/NotesPage/NotesPage.module.css";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";


export default async function NotesPage() {
  const initialData = await fetchNotes({
    search: "",
    page: 1,
    perPage: 12,
  });
  return (
    <main className={css.appWrapper}>
      <NotesClient initialData={initialData}/>
    </main>
  );
}
