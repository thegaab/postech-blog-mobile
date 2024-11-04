import { SuccessResponse } from "@/types/apiPatterns";
import apiRequest from "./api";
import { TeacherAuth } from "@/types/apiResponse";

export default function authenticate(username: string, password: string) {
  const req = apiRequest("POST", `/users/login`, {
    username: username.toLowerCase(),
    password: password.toLowerCase(),
  });

  async function submit() {
    const res: SuccessResponse<TeacherAuth> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
