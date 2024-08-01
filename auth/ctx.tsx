import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = createContext<{
  signIn: (v: string, isAdmin: boolean) => void;
  signOut: () => void;
  session?: {
    token: string;
    isAdmin: boolean;
  };
  isLoading: boolean;
}>({
  signIn: (v: string, isAdmin: boolean) => null,
  signOut: () => null,
  session: undefined,
  isLoading: false,
});

export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState("token");
  const [[_, isAdmin], setIsAdmin] = useStorageState("isAdmin");
  return (
    <AuthContext.Provider
      value={{
        signIn: (v, isAdmin) => {
          setToken(v);
          setIsAdmin(isAdmin);
        },
        signOut: () => {
          setToken(null);
          setIsAdmin(false);
        },
        session: {
          token: token,
          isAdmin: isAdmin,
        },
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
