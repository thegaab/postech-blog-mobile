import { Teacher, UpdatePostInterface } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

interface UpdatePassword {
  password: string | undefined;
}

export default function updateTeacherPassword(
  teacherId: string,
  data: UpdatePassword
) {
  const req = apiRequest("PUT", `/users/password/${teacherId}`, data);

  async function submit() {
    if (!data.password || data.password === "") return false;
    const res: SuccessResponse<Teacher> = await req.submit();

    return res.status === 200;
  }

  return { ...req, submit: submit };
}
