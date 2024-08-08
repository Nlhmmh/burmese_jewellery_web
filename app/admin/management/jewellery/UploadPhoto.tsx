import { MyIcon } from "@/components/Icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const UploadPhoto = ({
  onUploadPhoto,
}: {
  onUploadPhoto: (v: any) => void;
}) => {
  const [photo, setPhoto] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) return;
    if (result.assets.length == 0) return;
    setPhoto(result.assets[0]);
    onUploadPhoto(result.assets[0]);
  };

  return (
    <>
      {photo ? (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
            borderStyle: "dashed",
            alignItems: "center",
          }}
        >
          {/* ---------------- Image */}
          <Image
            source={{
              uri: photo.uri,
            }}
            style={{ width: 200, height: 200 }}
          />
          {/* ---------------- Edit Button */}
          <View
            style={{
              position: "absolute",
              top: 5,
              right: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 20,
            }}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
              <MyIcon icon="edit" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
          <View
            style={{
              height: 200,
              borderRadius: 10,
              borderWidth: 1,
              borderStyle: "dashed",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MyIcon icon="file-image" />
            <View style={{ height: 10 }}></View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "gray",
              }}
            >
              {"Upload Photo (PNG or JPEG)"}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "gray",
              }}
            >
              {"Max Size 15MB"}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
