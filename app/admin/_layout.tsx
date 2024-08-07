import { AdminNavBar } from "@/app/admin/AdminNavBar";
import { useSession } from "@/auth/ctx";
import { Constant } from "@/constants/Constant";
import { Redirect, Slot, usePathname } from "expo-router";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import { AdminSideDrawer } from "./AdminSideDrawer";

export default function AdminLayout() {
  const { session, isLoading } = useSession();
  const path = usePathname();

  if (isLoading) return <Text>Loading...</Text>;

  if (!session || session!.token === "" || session!.isAdmin === false) {
    if (path !== Constant.screens.AdminLogin)
      return <Redirect href={Constant.screens.AdminLogin} />;
  }
  if (path === Constant.screens.AdminLogin)
    return (
      <View style={{ backgroundColor: "white", flex: 1 }}>
        <AdminNavBar />
        <View style={{ height: 5 }} />
        <Slot />
      </View>
    );

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <AdminNavBar />
      <View style={{ height: 5 }} />
      <View style={{ flexDirection: "row", height: "100%" }}>
        <AdminSideDrawer />
        <Card
          style={{
            flex: 1,
            backgroundColor: "white",
            height: "100%",
            padding: 5,
          }}
        >
          <Slot />
        </Card>
      </View>
    </View>
  );
}
