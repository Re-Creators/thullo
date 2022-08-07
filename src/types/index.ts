import { definitions } from "./supabase";

export interface Supabase extends Omit<definitions, ""> {}

export interface CardData {
  id: string;
  name: string;
  cover?: {
    type: string;
    source: string;
  };
  description?: string;
  attachments?: {
    id: string;
    date: string;
    filename: string;
  };
  members?: [];
  comments?: [];
  labels?: LabelData[];
  list_id: string;
  board_id: string;
  pos: number;
}

export interface ListData {
  id: string;
  name: string;
  board_id: string;
}

export interface LabelData {
  id: string;
  name: string;
  color: string;
  board_id: string;
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

export interface DragAndDrop {
  columnOrder: string[];
}
