import { Slot } from "expo-router";
import { AppNavBar } from "./AppNavBar";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <AppNavBar />
      <Slot />
    </View>
  );
}
