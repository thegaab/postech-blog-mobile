import { PostInterface } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

export default function getPublicOnePost(postId: string) {
  const req = apiRequest("GET", `/posts/${postId}`);

  async function submit() {
    const res: SuccessResponse<PostInterface> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
