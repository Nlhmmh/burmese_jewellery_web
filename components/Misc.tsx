import { FlexAlignType, Text, View } from "react-native";

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

export function MyDivider({ borderColor = "gray" }: { borderColor?: string }) {
  return (
    <View
      style={{
        borderColor: borderColor,
        borderWidth: 1,
        width: "100%",
        height: 1,
      }}
    />
  );
}

export const TextRow = ({ field, value }: { field: string; value: string }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ flex: 1 }}>{field}</Text>
      <Text style={{ flex: 1 }}>{value}</Text>
    </View>
  );
};
