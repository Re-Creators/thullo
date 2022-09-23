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

export interface Profile {
  id: string;
  username: string;
  email: string;
  avatar_url: string;
  updated_at: string;
}

export interface MemberData {
  id: number;
  profile: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

export interface CommentData {
  id: string;
  board_id: string;
  card_id: string;
  created_at: string;
  text: string;
  profile_id: string;
  profile: {
    id: string;
    username: string;
    avatar_url: string;
  };
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
  description: string;
  is_private: boolean;
  user_id?: string;
  profiles: Profile;
  members: MemberData[];
}

export interface DragAndDrop {
  columnOrder: string[];
}
