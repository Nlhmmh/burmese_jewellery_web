import { default as myTheme } from "@/assets/custom-theme.json";
import { Avatar, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Menu } from "react-native-paper";

export function AdminNavBar({}) {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: myTheme["color-primary-100"],
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.5}>
        <Avatar
          source={require("@/assets/images/bj_logo_transparency.png")}
          size="large"
        />
      </TouchableOpacity>

      <View>
        <Text category="s1" style={{ textAlign: "center" }}>
          Burmese Jewellery
        </Text>
        <View style={{ height: 5 }} />
        <Text category="c1" style={{ textAlign: "center" }}>
          Admin
        </Text>
      </View>

      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        anchor={<IconButton icon="menu" onPress={() => setOpen(!open)} />}
      >
        <Menu.Item onPress={() => {}} title="Dash Board" />
        <Menu.Item onPress={() => {}} title="Log Out" />
      </Menu>
    </View>
  );
}
