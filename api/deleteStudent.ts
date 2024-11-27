import { Student } from "@/types";
import apiRequest from "./api";
import { InterfaceList, SuccessResponse } from "@/types/apiPatterns";

export default function deleteStudent(studentId: string) {
  const req = apiRequest("DELETE", `/student/${studentId}`);

  async function submit() {
    const res: SuccessResponse<InterfaceList<Student>> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
