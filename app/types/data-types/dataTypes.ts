export interface ContentItem {
  id: string;
  name: string;
  surname: string;
  age: number;
  email: string;
}

export interface DataContent {
  content: ContentItem[];
}

export interface ApiResponseType {
  success: boolean;
  message: string;
  data: DataContent;
}
