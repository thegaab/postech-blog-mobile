import { Student } from "@/types";
import apiRequest from "./api";
import { InterfaceList, SuccessResponse } from "@/types/apiPatterns";

export default function deleteTeacher(teacherId: string) {
  const req = apiRequest("DELETE", `/users/${teacherId}`);

  async function submit() {
    const res: SuccessResponse<InterfaceList<Student>> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
