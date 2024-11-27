import { Student } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

interface StudentCreateData {
  name: string;
}

export default function postStudent(studentData: StudentCreateData) {
  const req = apiRequest("POST", "/student", studentData);

  async function submit() {
    const res: SuccessResponse<Student> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
