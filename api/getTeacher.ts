import { Teacher } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

export default function getOneTeacher(teacherId: string) {
  const req = apiRequest("GET", `/users/id/${teacherId}`);

  async function submit() {
    const res: SuccessResponse<Teacher> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
