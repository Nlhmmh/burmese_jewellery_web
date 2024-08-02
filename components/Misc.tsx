import { FlexAlignType, View } from "react-native";

export function CenterView({
  body,
  alignItems,
}: {
  body: React.ReactNode;
  alignItems?: FlexAlignType | undefined;
}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: alignItems || "baseline",
      }}
    >
      {body}
    </View>
  );
}
