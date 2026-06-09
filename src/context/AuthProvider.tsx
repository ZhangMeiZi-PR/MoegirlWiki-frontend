import { createContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface AuthState {
  user?: string,
  roles?: number[],
  accessToken?: string,
}

interface AuthContextType {
  auth: AuthState,
  setAuth: Dispatch<SetStateAction<AuthState>>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
