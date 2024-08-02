import { default as myTheme } from "@/assets/custom-theme.json";
import { useSession } from "@/auth/ctx";
import { logoTransparency } from "@/constants/Assets";
import { Constant } from "@/constants/Constant";
import { Styles } from "@/constants/Styles";
import { Avatar, Text } from "@ui-kitten/components";
import { router, usePathname } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

export function AdminNavBar({}) {
  const [open, setOpen] = useState(false);
  const { session, signOut } = useSession();
  const path = usePathname();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: myTheme["color-secondary-100"],
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
        ...Styles.elevation,
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.5}>
        <Avatar source={logoTransparency} size="large" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push(Constant.screens.AdminDashBoard)}
        activeOpacity={0.5}
      >
        <View>
          <Text category="s1" style={{ textAlign: "center" }}>
            Burmese Jewellery
          </Text>
          <View style={{ height: 5 }} />
          <Text category="c1" style={{ textAlign: "center" }}>
            Admin
          </Text>
        </View>
      </TouchableOpacity>

      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchor={<IconButton icon="menu" onPress={() => setOpen(!open)} />}
      >
        {path != Constant.screens.AdminDashBoard && (
          <Menu.Item
            onPress={() => router.push(Constant.screens.AdminDashBoard)}
            title="Dash Board"
          />
        )}
        {!session && path != Constant.screens.AdminLogin && (
          <Menu.Item
            onPress={() => router.push(Constant.screens.AdminLogin)}
            title="Login"
          />
        )}
        {session && <Menu.Item onPress={() => signOut()} title="Log Out" />}
      </Menu>
    </View>
  );
}
