import { AdminNavBar } from "@/app/admin/AdminNavBar";
import { useSession } from "@/auth/ctx";
import { Redirect, Slot, usePathname } from "expo-router";
import { Text, View } from "react-native";

export default function AdminLayout() {
  const { session, isLoading } = useSession();
  const path = usePathname();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (!session || session!.token === "" || session!.isAdmin === false) {
    if (path !== "/admin/login") return <Redirect href="/admin/login" />;
  }
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <AdminNavBar />
      <View style={{ height: 5 }} />
      <Slot />
    </View>
  );
}
