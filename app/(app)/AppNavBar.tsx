import { default as myTheme } from "@/assets/custom-theme.json";
import { IconBtn } from "@/components/Button";
import { MyDividerVertical, MyText } from "@/components/Misc";
import { logoTransparency } from "@/constants/Assets";
import { Avatar, Text } from "@ui-kitten/components";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { Menu } from "react-native-paper";

export function AppNavBar({}) {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: myTheme["color-secondary-100"],
        paddingHorizontal: 30,
        paddingVertical: 5,
      }}
    >
      <View style={{ flex: 1, justifyContent: "center" }}>
        <TouchableOpacity onPress={() => router.push("/")} activeOpacity={0.5}>
          <Avatar source={logoTransparency} size="large" />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "center" }}>
        <MyText
          text={t("title")}
          style={{ textAlign: "center", fontSize: 30 }}
        />
        <View style={{ height: 5 }} />
        <MyText
          text={t("home-title")}
          style={{ textAlign: "center", fontSize: 12 }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          flex: 1,
          alignItems: "center",
        }}
      >
        <IconBtn icon="search" size={20} onPress={() => {}} />
        <View style={{ width: 30 }} />
        <MyDividerVertical />
        <View style={{ width: 30 }} />
        <IconBtn icon="shopping-bag" size={20} onPress={() => {}} />
        <View style={{ width: 30 }} />
        <MyDividerVertical />
        <View style={{ width: 30 }} />
        <Menu
          visible={open}
          anchorPosition="bottom"
          elevation={1}
          contentStyle={{ backgroundColor: "white", top: 10 }}
          onDismiss={() => setOpen(false)}
          anchor={
            <IconBtn icon="user" size={20} onPress={() => setOpen(!open)} />
          }
        >
          <Menu.Item onPress={() => router.push("/admin")} title={t("admin")} />
          <Menu.Item onPress={() => {}} title={t("login")} />
        </Menu>
      </View>
    </View>
  );
}
