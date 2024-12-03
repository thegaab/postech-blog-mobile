import { CreatePostInterface, PostInterface, Teacher } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";
import { Alert } from "react-native";

export default function createPost(postData: CreatePostInterface) {
  const req = apiRequest("POST", "/posts", postData);

  async function submit() {
    if (!postData.teacherId) {
      Alert.alert("É necessário fazer login");
      return undefined;
    }

    const res: SuccessResponse<PostInterface> = await req.submit();

    if (res.data) {
      return res.data;
    } else if (res.status >= 200 && res.status <= 300) {
      return true;
    } else {
      return false;
    }
  }

  return { ...req, submit: submit };
}
