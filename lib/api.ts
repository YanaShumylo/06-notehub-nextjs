import axios from "axios";
import type { NewNoteData, Note } from "../types/note";

const myKey = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
if (!myKey) {
  throw new Error("NEXT_PUBLIC_NOTEHUB_TOKEN is not defined in .env file");
}
const myApiKey = `Bearer ${myKey}`;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common['Authorization'] = myApiKey;

interface FetchNotesParams{
    page?: number;
    perPage?: number;
    search?: string;
}

interface NotesResponse{
  data: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

interface FetchNotesApiResponse{
 notes: Note[];
  totalPages: number;
}
export const fetchNotes = async ({
  search,
  page = 1,
  perPage = 12
}: FetchNotesParams): Promise<NotesResponse> => {
  const response = await axios.get<FetchNotesApiResponse>('/notes', {
    params: {
      page,
      perPage,
      ...(search?.trim() ? { search } : {}),
            },
            });
        
  return {
    page,
    perPage,
    data: response.data.notes,
    totalPages: response.data.totalPages,
        };
    };

export const createNote = async (noteData: NewNoteData): Promise<Note> => {
  try {
    const res = await axios.post<{ note: Note }>(
      "/notes",
      noteData,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return res.data.note;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.status_message || error.message;
      throw new Error(
        `Failed to create note: ${status ? `(${status})` : ""} ${message}`
      );
    } else {
      throw new Error("An unknown error occurred while creating note.");
    }
  }
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  try {
  const response = await axios.delete<{ note: Note }>(`/notes/${noteId}`);
  return response.data.note;
}catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.status_message || error.message;
      throw new Error(
        `Failed to delete note: ${status ? `(${status})` : ""} ${message}`
      );
    }
    throw new Error("An unknown error occurred while deleting note.");
  }
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  try {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
} catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message =
        error.response?.data?.status_message || error.message;
      throw new Error(
        `Failed to fetch note: ${status ? `(${status})` : ""} ${message}`
      );
    }
    throw new Error("An unknown error occurred while fetching note.");
  }
};