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
  setEnums: (v: string) => void;
  getEnums: () => any;
}>({
  signIn: (v: string, isAdmin: boolean) => null,
  signOut: () => null,
  session: undefined,
  isLoading: false,
  setEnums: (v: string) => null,
  getEnums: () => null,
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
  const [[isLoadingToken, token], setToken] = useStorageState("token");
  const [[isLoadingIsAdmin, isAdmin], setIsAdmin] = useStorageState("isAdmin");
  const [[isLoadingEnums, enums], setEnums] = useStorageState("enums");
  const isLoading = isLoadingToken && isLoadingIsAdmin && isLoadingEnums;
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
        setEnums: (v: string) => setEnums(v),
        getEnums: () => JSON.parse(enums),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
