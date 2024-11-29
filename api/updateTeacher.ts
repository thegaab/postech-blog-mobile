import { Teacher, UpdatePostInterface } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

export default function updateTeacher(
  teacherId: string,
  data: Partial<Teacher>
) {
  const req = apiRequest("PUT", `/users/${teacherId}`, data);

  async function submit() {
    const res: SuccessResponse<Teacher> = await req.submit();

    return { data };
  }

  return { ...req, submit: submit };
}
