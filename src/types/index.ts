import { definitions } from "./supabase";

export interface Supabase extends Omit<definitions, ""> {}

export interface CardData {
  id: string;
  title: string;
  cover?: string;
  description?: string;
  attachments?: {
    id: string;
    date: string;
    filename: string;
  };
  members?: [];
  comments?: [];
  labels?: [];
}

export interface ListData {
  id: string;
  title: string;
  taskIds: string[];
}

export type CoverType = "Image" | "Color";

export interface BoardData {
  id?: string;
  name: string;
  created_at?: string;
  cover: {
    type: CoverType;
    source: string;
  };
  is_private: boolean;
  user_id?: string;
}

//   // export

export interface DragAndDrop {
  columnOrder: string[];
}
