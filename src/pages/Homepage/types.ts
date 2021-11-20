export interface IData {
  id: number | string;
  title: string;
  description: string;
  status: number;
  createdAt: string;
}

export interface IModals {
  visible: boolean;
  edit: boolean;
  id: string | number;
}

export const initState: IData[] = [
  { id: 99, title: "", description: "", status: 998, createdAt: "" },
];
