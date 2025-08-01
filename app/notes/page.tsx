import dynamic from "next/dynamic";
import css from "../../components/NotesPage/NotesPage.module.css";

// Динамічний імпорт клієнтського компонента з вимкненим SSR
const NotesClient = dynamic(() => import("./Notes.client"));

export default function NotesPage() {
  return (
    <main className={css.appWrapper}>
      <NotesClient />
    </main>
  );
}
