import { CreatePostInterface, PostInterface, Teacher } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";
import { Alert } from "react-native";

export default function createPost(postData: CreatePostInterface) {
  const req = apiRequest("POST", "/student", postData);

  async function submit() {
    if (!postData.teacherId) {
      Alert.alert("É necessário fazer login");
      return undefined;
    }

    const res: SuccessResponse<PostInterface> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
