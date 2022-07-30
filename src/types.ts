export interface CardData {
  id: string;
  content: string;
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
