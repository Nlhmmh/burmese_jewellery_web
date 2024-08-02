import { default as myTheme } from "@/assets/custom-theme.json";
import { Button } from "@ui-kitten/components";
import { Text, TouchableOpacity, View } from "react-native";
import { MyIcon } from "./Icons";
import { CenterView } from "./Misc";

export function PrimaryBtn({
  title,
  width = 100,
  onPress,
}: {
  title: string;
  width?: number;
  onPress: () => void;
}) {
  return (
    <Button
      style={{ borderRadius: 10, width: width }}
      size="large"
      onPress={onPress}
    >
      {title}
    </Button>
  );
}

export function CardBtn({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
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

export function IconBtn({
  icon,
  size = 20,
  color = "black",
  onPress,
}: {
  icon: string;
  size?: number;
  color?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.5}>
      <CenterView body={<MyIcon icon={icon} size={size} color={color} />} />
    </TouchableOpacity>
  );
}
