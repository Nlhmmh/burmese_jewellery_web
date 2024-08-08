import { useSession } from "@/auth/ctx";
import { MyDivider } from "@/components/Misc";
import { ModalAction, ModalHeading, MyModal } from "@/components/Modals";
import { SelectField, TextField } from "@/components/TextField";
import { apiPost } from "@/utils/api";
import { fromObjToArray, numberOnly } from "@/utils/utils";
import { CheckBox, IndexPath } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import * as ImagePicker from "expo-image-picker";
import { t } from "i18next";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { HelperText } from "react-native-paper";
import { UploadPhoto } from "./UploadPhoto";

export const AddJewelleryModal = ({
  show,
  setShow,
  onSuccess,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  onSuccess: () => void;
}) => {
  const { session, getMaterials, getCategories, getGems } = useSession();
  const [gems] = useState(getGems());
  const [gemsArray] = useState(fromObjToArray(gems));
  const [materials] = useState(getMaterials());
  const [materialsArray] = useState(fromObjToArray(materials));
  const [categories] = useState(getCategories());
  const [categoriesArray] = useState(fromObjToArray(categories));
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      quantity: 0,
      price: 0,
      isPublished: false,
      categoryID: new IndexPath(0),
      gemID: new IndexPath(0),
      materialID: new IndexPath(0),
      image: null,
    },
  });
  const [errMsg, setErrMsg] = useState("");
  const [photo, setPhoto] = useState(null);

  const onClickAdd = async (formData: {
    name: string;
    description: string;
    quantity: number;
    price: number;
    isPublished: boolean;
    categoryID: IndexPath;
    gemID: IndexPath;
    materialID: IndexPath;
    image: string | null;
  }) => {
    setErrMsg("");
    apiPost({
      url: "/api/admin/jewellery",
      token: session?.token || "",
      data: {
        name: formData.name,
        description: formData.description,
        quantity: formData.quantity,
        price: formData.price,
        is_published: formData.isPublished,
        category_id: categoriesArray[formData.categoryID.row].key,
        gem_id: gemsArray[formData.gemID.row].key,
        material_id: materialsArray[formData.materialID.row].key,
        image_url:
          "https://media.tiffany.com/is/image/Tiffany/EcomBrowseM/tiffany-tsmile-pendant-33637179_958193_ED_M.jpg?defaultImage=NoImageAvailableInternal&fmt=webp",
      },
      then: (resp: AxiosResponse) => {
        if (resp.status !== 200) {
          if (!resp.data) return;
          setErrMsg(resp.data.message || resp.data.error || "");
          return;
        }
        setShow(false);
        reset();
        onSuccess();
      },
      onCatch: (e: AxiosError) => setErrMsg(e.message),
    });
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled && result.assets.length > 0) {
      setPhoto(result.assets[0]);
    }
  };

  return (
    <MyModal
      show={show}
      setShow={(v) => {
        if (v === false) reset();
        setShow(v);
      }}
      body={
        <>
          <ModalHeading
            show={show}
            title={`${t("add")} ${t("admin-management-jewellery")}`}
          />
          <View style={{ height: 20 }} />
          <MyDivider />
          <View style={{ height: 20 }} />

          <ScrollView style={{ height: 500 }}>
            {/* ------------- Name */}
            <Controller
              name="name"
              control={control}
              rules={{
                required: true,
                maxLength: 255,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value}
                  setValue={(v) => onChange(v)}
                  label={t("name")}
                  placeholder={t("name-placeholder")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.name?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            {errors.name?.type === "maxLength" && (
              <HelperText type="error">{t("name-max-length")}</HelperText>
            )}
            <View style={{ height: 20 }} />

            {/* ------------- Description */}
            <Controller
              name="description"
              control={control}
              rules={{
                required: true,
                maxLength: 255,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={value}
                  setValue={(v) => onChange(v)}
                  label={t("description")}
                  placeholder={t("description-placeholder")}
                  onBlur={onBlur}
                  multiline={true}
                  height={100}
                />
              )}
            />
            {errors.description?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            {errors.description?.type === "maxLength" && (
              <HelperText type="error">
                {t("description-max-length")}
              </HelperText>
            )}
            <View style={{ height: 20 }} />

            {/* ------------- Quantity */}
            <Controller
              name="quantity"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={String(value)}
                  setValue={(v) => onChange(numberOnly(v))}
                  label={t("quantity")}
                  placeholder={t("quantity-placeholder")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.quantity?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            <View style={{ height: 20 }} />

            {/* ------------- Price */}
            <Controller
              name="price"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextField
                  value={String(value)}
                  setValue={(v) => onChange(numberOnly(v))}
                  label={t("price")}
                  placeholder={t("price-placeholder")}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.price?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            <View style={{ height: 20 }} />

            {/* ------------- IsPublished */}
            <Controller
              name="isPublished"
              control={control}
              rules={{}}
              render={({ field: { onChange, onBlur, value } }) => (
                <CheckBox
                  checked={value}
                  onChange={(v) => onChange(v)}
                  onBlur={onBlur}
                >
                  {t("is-published")}
                </CheckBox>
              )}
            />
            <View style={{ height: 20 }} />

            {/* ------------- categoryID */}
            <Controller
              name="categoryID"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectField
                  val={value}
                  setValue={(v) => onChange(v)}
                  items={categoriesArray || []}
                  label={t("category")}
                  onBlur={onBlur}
                  placeholder={t("category-placeholder")}
                  itemDisplay={(v) => v.value.name}
                />
              )}
            />
            {errors.categoryID?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            <View style={{ height: 20 }} />

            {/* ------------- gemID */}
            <Controller
              name="gemID"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectField
                  val={value}
                  setValue={(v) => onChange(v)}
                  items={gemsArray || []}
                  label={t("gem")}
                  onBlur={onBlur}
                  placeholder={t("gem-placeholder")}
                  itemDisplay={(v) => v.value}
                />
              )}
            />
            {errors.gemID?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            <View style={{ height: 20 }} />

            {/* ------------- materialID */}
            <Controller
              name="materialID"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectField
                  val={value}
                  setValue={(v) => onChange(v)}
                  items={materialsArray || []}
                  label={t("material")}
                  onBlur={onBlur}
                  placeholder={t("material-placeholder")}
                  itemDisplay={(v) => v.value}
                />
              )}
            />
            {errors.materialID?.type === "required" && (
              <HelperText type="error">{t("required")}</HelperText>
            )}
            <View style={{ height: 10 }} />

            {/* ------------- Photo */}
            <UploadPhoto onUploadPhoto={(v) => setPhoto(v)} />
            <View style={{ height: 10 }} />
          </ScrollView>

          {errMsg !== "" && <HelperText type="error">{errMsg}</HelperText>}
          <View style={{ height: 20 }} />

          <ModalAction
            cancelTitle={t("cancel")}
            okTitle={t("add")}
            onCancel={() => {
              setShow(false);
              reset();
            }}
            onOK={handleSubmit(onClickAdd)}
          />
        </>
      }
    />
  );
};
