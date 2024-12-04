import { Teacher } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

interface CreateTeacher {
  name: string;
  username: string;
  password: string;
}

export default function createTeacher(studentData: CreateTeacher) {
  const req = apiRequest("POST", "/users", studentData);

  async function submit() {
    const res: SuccessResponse<Teacher> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
