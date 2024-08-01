import { default as myTheme } from "@/assets/custom-theme.json";
import { Drawer, DrawerItem, Icon } from "@ui-kitten/components";
import { Animation } from "@ui-kitten/components/ui/animation";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Card,
  IconButton,
  Icon as IconPaper,
  MD3Colors,
} from "react-native-paper";
import { Easing } from "react-native-reanimated";

function CardBtn({ title, onPress }: { title: string; onPress: () => void }) {
  return (
    <View style={{ padding: 10, width: "30%" }}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: myTheme["color-primary-500"],
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default function AdminDashBoardScreen() {
  const { width } = Dimensions.get("window");
  const aniWidth = useRef(new Animated.Value((width * 15) / 100)).current;
  // const translateX = useRef(new Animated.Value(0)).current;
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    // Animated.timing(translateX, {
    //   toValue: showDrawer ? -(width * 0) / 100 : 0,
    //   duration: 500,
    //   easing: Easing.linear,
    //   useNativeDriver: false,
    // }).start();
    Animated.timing(aniWidth, {
      toValue: showDrawer ? (width * 4) / 100 : (width * 15) / 100,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [showDrawer]);

  return (
    <View style={{ flexDirection: "row", height: "100%" }}>
      <Animated.View
        style={{
          width: aniWidth,
          // transform: [{ translateX }],
        }}
      >
        <Card
          elevation={2}
          style={{
            padding: 10,
            flexDirection: "row",
            backgroundColor: "white",
          }}
        >
          <View style={{}}>
            <Drawer>
              <DrawerItem
                title="User Management"
                accessoryLeft={<Icon name="user" pack="feather" />}
                accessoryRight={<Icon name="chevron-right" pack="feather" />}
                onPress={() => {}}
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
            </Drawer>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              bottom: 0,
              right: 0,
              position: "absolute",
              zIndex: 10,
            }}
          >
            <IconButton
              icon={
                showDrawer
                  ? "arrow-left-bold-outline"
                  : "arrow-right-bold-outline"
              }
              size={30}
              onPress={() => setShowDrawer(!showDrawer)}
              style={{
                backgroundColor: "white",
                shadowColor: "black",
                shadowOffset: { width: 1, height: 1 },
                shadowRadius: 4,
                padding: 0,
                margin: 0,
              }}
            />
          </View>
        </Card>
      </Animated.View>
      <View style={{ width: 10 }} />
      <Card style={{ flex: 1, backgroundColor: "yellow", height: "100%" }}>
        {" "}
      </Card>
    </View>
  );
}
