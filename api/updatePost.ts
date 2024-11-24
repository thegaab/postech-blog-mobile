import { PostInterface, UpdatePostInterface } from "@/types";
import apiRequest from "./api";
import { SuccessResponse } from "@/types/apiPatterns";

export default function updatePost(
  postId: string,
  data: Partial<UpdatePostInterface>
) {
  const req = apiRequest("PUT", `/posts/${postId}`, data);

  async function submit() {
    const res: SuccessResponse<PostInterface> = await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
