import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from "react";
import { fetchInitDate } from "./init_data";
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
  setGems: (v: string) => void;
  getGems: () => any;
  setMaterials: (v: string) => void;
  getMaterials: () => any;
  setCategories: (v: string) => void;
  getCategories: () => any;
}>({
  signIn: (v: string, isAdmin: boolean) => null,
  signOut: () => null,
  session: undefined,
  isLoading: false,
  setEnums: (v: string) => null,
  getEnums: () => null,
  setGems: (v: string) => null,
  getGems: () => null,
  setMaterials: (v: string) => null,
  getMaterials: () => null,
  setCategories: (v: string) => null,
  getCategories: () => null,
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
  const [isFetchedInitData, setIsFetchedInitData] = useState(false);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [[isLoadingToken, token], setToken] = useStorageState("token");
  const [[isLoadingIsAdmin, isAdmin], setIsAdmin] = useStorageState("isAdmin");
  const [[isLoadingEnums, enums], setEnums] = useStorageState("enums");
  const [[isLoadedGems, gems], setGems] = useStorageState("gems");
  const [[isLoadedMaterials, materials], setMaterials] =
    useStorageState("materials");
  const [[isLoadedCategories, categories], setCategories] =
    useStorageState("categories");
  const isLoading =
    isFetchCompleted &&
    isLoadingToken &&
    isLoadingIsAdmin &&
    isLoadingEnums &&
    isLoadedGems &&
    isLoadedMaterials &&
    isLoadedCategories;

  const fetch = async () => {
    await fetchInitDate(setEnums, setGems, setMaterials, setCategories);
    setIsFetchCompleted(true);
  };

  if (!isFetchedInitData) {
    fetch();
    setIsFetchedInitData(true);
  }

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
        isLoading: isFetchCompleted,
        setEnums: (v: string) => setEnums(v),
        getEnums: () => JSON.parse(enums),
        setGems: (v: string) => setGems(v),
        getGems: () => JSON.parse(gems),
        setMaterials: (v: string) => setMaterials(v),
        getMaterials: () => JSON.parse(materials),
        setCategories: (v: string) => setCategories(v),
        getCategories: () => JSON.parse(categories),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
