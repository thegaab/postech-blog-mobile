import { authKey } from "@/constants/storage";
import { TeacherAuth } from "@/types/apiResponse";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getToken: () => Promise<TeacherAuth> = async () => {
  const app = await AsyncStorage.getItem(authKey.api);

  if (app) {
    return JSON.parse(app);
  }

  return undefined;
};

export const setToken = async (payload: TeacherAuth) => {
  await AsyncStorage.setItem(authKey.api, JSON.stringify(payload));
};

export const clearToken = async () => {
  await AsyncStorage.removeItem(authKey.api);
};

export const hasToken = async () => {
  const auth = await getToken();
  if (!auth) return false;

  const app = auth.token;

  return !!app;
};

const storage = {
  getToken,
  setToken,
  clearToken,
  hasToken,
};

export default storage;
