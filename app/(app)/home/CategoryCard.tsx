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
          zIndex: 1,
        }}
      />
      <View style={{ height: 10 }} />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 5,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyText
          text={cat.name}
          style={{
            textAlign: "center",
            fontSize: 24,
            color: "white",
          }}
        />
      </View>
    </View>
  );
}
