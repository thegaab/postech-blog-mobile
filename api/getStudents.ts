import { Student } from "@/types";
import apiRequest from "./api";
import { InterfaceList, SuccessResponse } from "@/types/apiPatterns";

export function getOneStudent(studentId: string) {
  const req = apiRequest("GET", `/student/id/${studentId}`);

  async function submit() {
    const res: SuccessResponse<Student> = await req.submit();
    return res.data;
  }

  return { ...req, submit: submit };
}

export default function getStudents(page: number, perPage?: number) {
  const getParams = page ? `?page=${page}&perPage=${perPage ?? "6"}` : "";

  const req = apiRequest("GET", `/student${getParams}`);

  async function submit() {
    const res: SuccessResponse<InterfaceList<Student>> = await req.submit();
    const { data } = res;
    return data;
  }

  return { ...req, submit: submit };
}
