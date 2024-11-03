export interface Teacher {
  id: string;
  username: string;
}

export type SessionTeacher = Teacher | Partial<Teacher> | undefined;

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
