/* eslint-disable react-hooks/rules-of-hooks */

import { Teacher } from "@/types";
import { clearToken, getToken, setToken } from "./storage";
import { TeacherAuth } from "@/types/apiResponse";
import { isTokenValid } from "../utils/auth";

export async function getUserFn(): Promise<Teacher | undefined> {
  const currAuth: TeacherAuth = await getToken();
  if (!currAuth) return undefined;

  const authIsValid = isTokenValid(currAuth.expireAt);

  if (!authIsValid) return undefined;

  return currAuth.user;
}

export async function handleUserResponse(loginAuth?: TeacherAuth) {
  const currAuth: TeacherAuth = await getToken();

  console.log("currAuth", currAuth);

  const auth: TeacherAuth = loginAuth ?? currAuth;

  console.log("auth", auth);

  if (!auth) {
    await clearToken();
    throw new Error("Não foi possivel confirmar suas credenciais");
  }
  const authIsValid = isTokenValid(auth.expireAt);

  console.log("authIsValid", authIsValid);

  if (!authIsValid) {
    await clearToken();
    throw new Error("Não foi possivel confirmar suas credenciais");
  }

  setToken(auth);

  const user = (await getUserFn()) as Teacher;

  console.log("user", user);

  return user;
}
