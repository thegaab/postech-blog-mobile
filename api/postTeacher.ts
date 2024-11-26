import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

interface TeacherCreateData {
  name: string;
  username?: string;
  password?: string;
}

export default function postTeacher(teacherData: TeacherCreateData) {
  const req = apiRequest("POST", "/teacher", studentData);

  async function submit() {
    const res: SuccessResponse<TeacherCreateData> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
