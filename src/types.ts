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

export interface CardBoardData {
  id: string;
  title: string;
  type: CoverType;
  cover: string;
  isPrivate: boolean;
}

// export

export interface DragAndDrop {
  columnOrder: string[];
}
