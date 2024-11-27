// Teacher

export interface Teacher {
  id: string;
  username: string;
  name: string;
}

export type SessionTeacher = Teacher | Partial<Teacher> | undefined;

// Student

export interface Student {
  id: string;
  name: string;
  grades: number[];
}

// Post

export interface CreatePostInterface {
  text: string;
  teacherId: string;
  title: string;
  keyWords: string[];
}

// versão atual retornada pelo backend @24Sept
export interface PostInterface {
  id: string;
  title: string;
  teacherId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
  text: string;
  keyWords: string[];
}

export type UpdatePostInterface = Pick<
  PostInterface,
  "title" | "text" | "keyWords"
>;
