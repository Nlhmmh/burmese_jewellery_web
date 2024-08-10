import { useSession } from "@/auth/ctx";
import { MyText } from "@/components/Misc";
import { Constant } from "@/constants/Constant";
import { apiGet } from "@/utils/api";
import { fromObjToArray } from "@/utils/utils";
import { useIsFocused } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { ResizeMode, Video } from "expo-av";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { Jewellery } from "../admin/management/jewellery";
import CategoryCard from "./home/CategoryCard";
import { JewelleryCard } from "./home/JewelleryCard";

export default function HomeScreen() {
  const isFocused = useIsFocused();
  const ref = useRef<Video | null>(null);
  const { isLoading, session, getGems, getMaterials, getCategories } =
    useSession();
  const [gems] = useState(getGems());
  const [gemsArray] = useState(fromObjToArray(gems));
  const [materials] = useState(getMaterials());
  const [materialsArray] = useState(fromObjToArray(materials));
  const [categories, setCategories] = useState(getCategories());
  const [categoriesArray, setCategoriesArray] = useState(
    fromObjToArray(categories)
  );

  const [items, setItems] = useState<Array<Jewellery>>([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(Constant.sorts.desc);
  const [limit, setLimit] = useState(8);
  const [page, setPage] = useState(0);
  const from = page * limit;

  useEffect(() => {
    setCategories(getCategories());
    setCategoriesArray(fromObjToArray(getCategories()));
  }, [isLoading]);

  useEffect(() => {
    if (!isFocused) return;
    if (ref && ref.current) ref.current.playAsync();
  }, [isFocused]);

  const fetch = () => {
    setLoading(true);
    let url = `/api/jewellery?offset=${from}&limit=${limit}&sort=${sort}&is_published=true`;
    apiGet({
      url: url,
      token: session ? session?.token : "",
      then: (resp: AxiosResponse) => {
        if (resp.status !== 200) {
          return;
        }
        if (!resp.data.data) return;
        for (const v of resp.data.data) {
          v.key = v.jewellery_id;
          v.gem_name = getGems()[v.gem_id];
          v.material_name = getMaterials()[v.material_id];
          v.category_name = getCategories()[v.category_id].name;
        }
        setItems(resp.data.data);
      },
      onFinally: () => setLoading(false),
    });
  };

  useEffect(() => {
    if (!isFocused) return;
    if (ref && ref.current) ref.current.playAsync();
    fetch();
  }, [isFocused]);

  return (
    <ScrollView>
      <Video
        ref={ref}
        style={{
          width: "100%",
          height: 700,
        }}
        videoStyle={{
          width: "100%",
          height: 700,
        }}
        source={{
          uri: "https://media.tiffany.com/is/content/tiffanydm/2024-Icons-BG-Hero-T-Video-Desktop-2",
        }}
        isMuted={true}
        resizeMode={ResizeMode.COVER}
        isLooping
        rate={1}
      />
      <View style={{ height: 100 }} />

      {/* ------------- Item List */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 50,
          flexWrap: "wrap",
        }}
      >
        {items.map((v, i) => (
          <JewelleryCard key={i} data={v} />
        ))}
      </View>
      <View style={{ height: 100 }} />

      {/* ------------- Shop by Category */}
      <MyText
        text={t("shop-by-category")}
        style={{ textAlign: "center", fontSize: 30 }}
      />
      <View style={{ height: 30 }} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          paddingHorizontal: 50,
        }}
      >
        {categoriesArray.map((v, i) => (
          <CategoryCard key={i} cat={v.value} />
        ))}
      </View>
      <View style={{ height: 100 }} />

      <Image
        source={{
          uri: "https://media.tiffany.com/is/image/tiffanydm/2024-Icons-HP-FWMH-SDR-Desktop?$tile$&wid=2992&fmt=webp",
        }}
        resizeMode={"cover"}
        style={{
          width: "100%",
          height: 500,
        }}
      />
      <View style={{ height: 100 }} />

      <View
        style={{ height: 50, justifyContent: "center", alignItems: "center" }}
      >
        <MyText text="© Burmese Jewellery Co. Ltd. 2024" style={{}} />
      </View>
    </ScrollView>
  );
}
