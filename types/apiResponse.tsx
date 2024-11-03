import { Teacher } from ".";

export interface TeacherAuth {
  token: string;
  expireAt: string;
  user: Teacher;
}
