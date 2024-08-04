import { AdminNavBar } from "@/app/admin/AdminNavBar";
import { useSession } from "@/auth/ctx";
import { parseEnums } from "@/auth/enums";
import { MyIcon } from "@/components/Icons";
import { Constant } from "@/constants/Constant";
import { apiGet } from "@/utils/api";
import { DrawerItem, Icon } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { Redirect, router, Slot, usePathname } from "expo-router";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Card } from "react-native-paper";
import { Easing } from "react-native-reanimated";

export default function AdminLayout() {
  const { session, isLoading, setEnums } = useSession();
  const path = usePathname();

  const [isEnumLoaded, setIsEnumLoaded] = useState(false);
  useEffect(() => {
    if (!isEnumLoaded)
      apiGet({
        url: "/api/enums",
        token: "",
        then: (resp: AxiosResponse) => {
          if (resp.status !== 200) {
            return;
          }
          setEnums(JSON.stringify(parseEnums(resp.data)));
        },
        onCatch: (e: AxiosError) => {},
        onFinally: () => setIsEnumLoaded(true),
      });
  }, []);

  const { width } = Dimensions.get("window");
  const aniWidth = useRef(new Animated.Value((width * 10) / 100)).current;
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    Animated.timing(aniWidth, {
      toValue: showDrawer ? 50 : (width * 10) / 100,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [showDrawer]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
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

  const menuList = [
    {
      label: "admin-management-admin",
      routeName: Constant.screens.AdminUserManagementAdmin,
      icon: "user",
    },
    {
      label: "admin-management-user",
      routeName: Constant.screens.AdminUserManagementUser,
      icon: "user",
    },
    {
      label: "admin-management-category",
      routeName: Constant.screens.AdminCategoryManagement,
      icon: "list",
    },
    {
      label: "admin-management-gem",
      routeName: Constant.screens.AdminGemManagement,
      icon: "aperture",
    },
    {
      label: "admin-management-material",
      routeName: Constant.screens.AdminMaterialManagement,
      icon: "archive",
    },
    {
      label: "admin-management-jewellery",
      routeName: Constant.screens.AdminJewelleryManagement,
      icon: "target",
    },
    {
      label: "admin-management-faq",
      routeName: Constant.screens.AdminFAQManagement,
      icon: "message-circle",
    },
  ];

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <AdminNavBar />
      <View style={{ height: 5 }} />
      <View style={{ flexDirection: "row", height: "100%" }}>
        <Animated.View style={{ width: aniWidth }}>
          <Card
            style={{
              flexDirection: "row",
              backgroundColor: "white",
              borderRadius: 10,
              paddingVertical: 5,
            }}
          >
            {menuList.map((v) => (
              <MyDrawerItem
                key={v.label}
                label={v.label}
                routeName={v.routeName}
                icon={v.icon}
              />
            ))}
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowDrawer(!showDrawer)}
            >
              <MyIcon
                icon={showDrawer ? "chevron-right" : "chevron-left"}
                size={30}
              />
            </TouchableOpacity>
          </Card>
        </Animated.View>
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

function MyDrawerItem({
  label,
  routeName,
  icon,
}: {
  label: string;
  routeName: string;
  icon: string;
}) {
  return (
    <DrawerItem
      title={t(label)}
      accessoryLeft={<Icon name={icon} pack="feather" />}
      accessoryRight={<Icon name="chevron-right" pack="feather" />}
      onPress={() => router.push(routeName)}
      activeOpacity={0.1}
    />
  );
}
