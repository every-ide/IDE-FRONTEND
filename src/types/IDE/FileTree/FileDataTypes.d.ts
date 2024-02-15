export interface FileNodeType {
  id: string;
  name: string;
  children?: FileNodeType[];
  type: string;
  path: string;

  // isDirty?: boolean;
  // isOpened?: boolean;
  // language?: string;
  // filePath?: string | null;
  // content?: string | null;
}
