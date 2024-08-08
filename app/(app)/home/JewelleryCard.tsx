import { Jewellery } from "@/app/admin/management/jewellery";
import { IconBtn } from "@/components/Button";
import { MyText } from "@/components/Misc";
import { Dimensions, Image, Text, View } from "react-native";

export const JewelleryCard = ({ data }: { data: Jewellery }) => {
  const { width } = Dimensions.get("window");
  return (
    <View
      style={{
        width: (width * 15) / 100,
        padding: (((width * 15) / 100) * 5) / 100,
        backgroundColor: "#fbfbfb",
        borderRadius: 10,
      }}
    >
      <Image
        source={{
          uri: data.image_url,
        }}
        resizeMode={"cover"}
        style={{
          width: "100%",
          height: 200,
        }}
      />
      <View style={{ height: 20 }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <MyText text={data.name} style={{ fontSize: 20 }} />
          <MyText text={`$ ${data.price}`} style={{ fontSize: 18 }} />
        </View>

        <IconBtn icon="cart-plus" size={30} onPress={() => {}} />
      </View>
    </View>
  );
};
