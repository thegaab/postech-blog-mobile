import { createContext, useContext, useMemo, useState } from "react";

import { SessionTeacher } from "@/types";
import { TeacherAuth } from "@/types/apiResponse";
import { handleUserResponse } from "@/ui/services/auth";
import storage from "@/ui/services/storage";
import { useNavigate } from "@/ui/navigation";
import { isTokenValid } from "@/ui/utils/auth";

type SubmitLogin = () => Promise<TeacherAuth>;

interface SessionContext {
  user?: SessionTeacher;
  isLogged: boolean;
  authenticate: (token: TeacherAuth) => void;
  login: (f: SubmitLogin) => void;
  logout: () => void;
}

const DEFAULT_VALUES = {
  user: undefined,
  isLogged: false,
  login: (f: SubmitLogin) => {},
  logout: () => {},
  authenticate: () => {},
};

const SessionContext = createContext<SessionContext>(DEFAULT_VALUES);

export const useSessionContext = () => {
  const context = useContext(SessionContext);

  if (context === undefined) {
    throw new Error("Missing SessionContext on React three");
  }

  return context;
};

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<SessionTeacher>(DEFAULT_VALUES.user);
  const navigate = useNavigate();

  const login = async (authLogin: () => Promise<TeacherAuth>) => {
    const auth = await authLogin();
    if (!auth) return;

    await handleUserResponse(auth).then((res) => {
      console.log("handleUserResponse", res);
      setUser(res);
      navigate.to("home");
    });
  };

  const logout = () => {
    setUser(undefined);
    storage.clearToken();
  };

  const authenticate = (auth: TeacherAuth) => {
    if (user) return;
    if (auth && auth.expireAt && isTokenValid(auth.expireAt)) {
      setUser(auth.user);
      return;
    }

    handleUserResponse()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        // showToast({
        //   type: "error",
        //   message: "Não foi possivel validar suas credenciais, faça o login",
        // });
        setTimeout(() => {
          navigate.to("login");
        }, 3000);
      });
  };

  const isLogged = !!user;

  const value = {
    user,
    isLogged,
    login,
    logout,
    authenticate,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};
