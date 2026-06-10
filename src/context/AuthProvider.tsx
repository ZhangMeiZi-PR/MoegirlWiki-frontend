import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface AuthState {
  user?: {
    id: string,
    username: string,
    email: string,
    avatar: string
  },
  roles?: number[],
  accessToken?: string,
}

interface AuthContextType {
  auth: AuthState,
  setAuth: Dispatch<SetStateAction<AuthState>>,
  // persist: boolean,
  // setPersist: Dispatch<SetStateAction<boolean>>,
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});
  // const [persist, setPersist] = useState<boolean>(() => {
  //   const stored = localStorage.getItem("persist");
  //   return stored ? JSON.parse(stored) : false;
  // });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
