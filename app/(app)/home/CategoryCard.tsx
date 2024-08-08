import { MyText } from "@/components/Misc";
import { Dimensions, Image, View } from "react-native";

export default function CategoryCard({ cat }: { cat: any }) {
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        width: (width * 15) / 100,
        height: (width * 15) / 100,
      }}
    >
      <Image
        source={{ uri: cat.image_url }}
        resizeMode={"cover"}
        style={{
          width: (width * 15) / 100,
          height: (width * 15) / 100,
          borderRadius: 10,
        }}
      />
      <MyText text={cat.name} style={{ textAlign: "center" }} />
    </View>
  );
}
