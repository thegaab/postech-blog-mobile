import { Student } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

export default function updateStudent(
  studentId: string,
  data: Partial<Student>
) {
  const req = apiRequest("PUT", `/student/${studentId}`, data);

  async function submit() {
    const res: SuccessResponse<Student> = await req.submit();
    return res.data;
  }

  return { ...req, submit: submit };
}
