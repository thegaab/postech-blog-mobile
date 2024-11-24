import { PostInterface } from "@/types";
import apiRequest from "./api";
import { InterfaceList, SuccessResponse } from "@/types/apiPatterns";

export default function getPublicPostsByKeyword(
  keyword: string,
  page: number,
  perPage?: number
) {
  const getParams = page ? `?page=${page}&limit=${perPage ?? "6"}` : "";

  const req = apiRequest("GET", `/posts/${keyword}/${getParams}`);

  async function submit() {
    const res: SuccessResponse<InterfaceList<PostInterface>> =
      await req.submit();

    const { data } = res;

    return data;
  }

  return { ...req, submit: submit };
}
