import { Student } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

export default function getOneStudent(studentId: string) {
  const req = apiRequest("GET", `/student/id/${studentId}`);

  async function submit() {
    const res: SuccessResponse<Student> = await req.submit();

    if (!res) return undefined;

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
