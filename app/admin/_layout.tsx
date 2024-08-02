import { AdminNavBar } from "@/app/admin/AdminNavBar";
import { useSession } from "@/auth/ctx";
import { Redirect, router, Slot, usePathname } from "expo-router";
import { Drawer, DrawerItem, Icon } from "@ui-kitten/components";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { Card, Icon as IconPaper } from "react-native-paper";
import { Easing } from "react-native-reanimated";
import { Constant } from "@/constants/Constant";

export default function AdminLayout() {
  const { session, isLoading } = useSession();
  const path = usePathname();

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

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <AdminNavBar />
      <View style={{ height: 5 }} />
      <View style={{ flexDirection: "row", height: "100%" }}>
        <Animated.View style={{ width: aniWidth }}>
          <Card
            elevation={2}
            style={{
              flexDirection: "row",
              backgroundColor: "white",
            }}
          >
            <Drawer>
              <DrawerItem
                title="User Management"
                accessoryLeft={<Icon name="user" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {
                  router.push(Constant.screens.AdminUserManagement);
                }}
                activeOpacity={0.1}
              />
              <DrawerItem
                title="Category Management"
                accessoryLeft={<Icon name="list" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {}}
                activeOpacity={0.1}
              />
              <DrawerItem
                title="Gem Management"
                accessoryLeft={<Icon name="aperture" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {}}
                activeOpacity={0.1}
              />
              <DrawerItem
                title="Material Management"
                accessoryLeft={<Icon name="archive" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {}}
                activeOpacity={0.1}
              />
              <DrawerItem
                title="Jewellery Management"
                accessoryLeft={<Icon name="target" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {}}
                activeOpacity={0.1}
              />
              <DrawerItem
                title="FAQ Management"
                accessoryLeft={<Icon name="message-circle" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {}}
                activeOpacity={0.1}
              />
              <TouchableOpacity
                style={{
                  width: 50,
                  height: 80,
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 5,
                }}
                onPress={() => setShowDrawer(!showDrawer)}
              >
                <IconPaper
                  source={showDrawer ? "chevron-right" : "chevron-left"}
                  size={40}
                />
              </TouchableOpacity>
            </Drawer>
          </Card>
        </Animated.View>

        <View style={{ width: 10 }} />

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
