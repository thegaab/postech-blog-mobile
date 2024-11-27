import { FailedResponse } from "@/types/apiPatterns";
import { TeacherAuth } from "@/types/apiResponse";
import { getToken } from "@/ui/services/storage";
import { useState } from "react";

type RequestMethods = "GET" | "POST" | "PUT" | "DELETE";
type RequestError = {
  status: number;
  message?: string;
};

export default function apiRequest(
  method: RequestMethods,
  path: string,
  body?: any
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [err, setErr] = useState<FailedResponse | undefined>(undefined);

  const requestHeaders = {
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,DELETE,PATCH,POST,PUT",
    "Access-Control-Allow-Headers":
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
    "Content-Type": "application/json",
  };

  const submitRequest = async () => {
    const currAuth: TeacherAuth = await getToken();
    setIsLoading(true);

    const requestParams = {
      headers: {
        ...requestHeaders,
        Authorization: `Bearer ${currAuth?.token ?? ""}`,
      },
      method: method,
      body: body ? JSON.stringify(body) : "",
    };

    try {
      const res = await fetch(
        `https://postech-blog-api.onrender.com${path}`,
        requestParams
      ).then((res) => res.json());

      setIsLoading(false);

      if (!res || res.statusCode >= 300) {
        throw new Error(res);
      }

      return res;
    } catch (error) {
      setIsLoading(false);
      const er = error as unknown as FailedResponse;
      console.log("ERROR", path, error);
      setErr(er);
    }
  };

  return {
    submit: submitRequest,
    loading: isLoading,
    err: err,
  };
}
