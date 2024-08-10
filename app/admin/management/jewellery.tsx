import { useSession } from "@/auth/ctx";
import { IconBtn } from "@/components/Button";
import { CenterView } from "@/components/Misc";
import { ErrorModal, ImageViewerModal } from "@/components/Modals";
import { SelectField, TextField } from "@/components/TextField";
import { Constant } from "@/constants/Constant";
import { apiGet } from "@/utils/api";
import { fromObjToArrayWithDefault } from "@/utils/utils";
import { IndexPath } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { t } from "i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import { Clipboard, Image, ScrollView, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { AddJewelleryModal } from "./jewellery/AddJewelleryModal";
import { DeleteJewelleryModal } from "./jewellery/DeleteJewelleryModal";
import { EditJewelleryModal } from "./jewellery/EditJewelleryModal";

export interface Jewellery {
  key: string;
  jewellery_id: string;
  category_id: string;
  category_name: string;
  gem_id: string;
  gem_name: string;
  material_id: string;
  material_name: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image_url: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function AdminManagementJewelleryScreen() {
  const { session, getGems, getMaterials, getCategories } = useSession();
  const [gems] = useState(getGems());
  const [gemsArray] = useState(fromObjToArrayWithDefault(gems));
  const [materials] = useState(getMaterials());
  const [materialsArray] = useState(fromObjToArrayWithDefault(materials));
  const [categories] = useState(getCategories());
  const [categoriesArray] = useState(fromObjToArrayWithDefault(categories));
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(Constant.limits[0]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [sort, setSort] = useState(Constant.sorts.desc);
  const [items, setItems] = useState<Array<Jewellery>>([]);
  const from = page * limit;
  const to = Math.min((page + 1) * limit, totalItemCount);
  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchIsPublished, setSearchIsPublished] = useState(new IndexPath(0));
  const [searchGem, setSearchGem] = useState(new IndexPath(0));
  const [searchMaterial, setSearchMaterial] = useState(new IndexPath(0));
  const [searchCategory, setSearchCategory] = useState(new IndexPath(0));
  const [searchName, setSearchName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDelModel, setEditDelModel] = useState<Jewellery>({
    key: "",
    jewellery_id: "",
    category_id: "",
    category_name: "",
    gem_id: "",
    gem_name: "",
    material_id: "",
    material_name: "",
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image_url: "",
    is_published: false,
    created_at: "",
    updated_at: "",
  });
  const [delModal, setDelModal] = useState(false);
  const [image, setImage] = useState("");
  const [showImage, setShowImage] = useState(false);

  const showErrMsg = (errMsg: string) => {
    setShowErrModal(true);
    setErrMsg(errMsg);
  };

  const fetch = () => {
    setLoading(true);
    let url = `/api/jewellery?offset=${from}&limit=${limit}&sort=${sort}`;
    if (searchID !== "") url += `&id=${searchID}`;
    if (searchName !== "") url += `&name=${searchName}`;
    if (Constant.trueFalseSelects[searchIsPublished.row].key !== "") {
      url += `&is_published=${
        Constant.trueFalseSelects[searchIsPublished.row].value
      }`;
    }
    if (gemsArray[searchGem.row].key !== "") {
      url += `&gem_id=${gemsArray[searchGem.row].key}`;
    }
    if (materialsArray[searchMaterial.row].key !== "") {
      url += `&material_id=${materialsArray[searchMaterial.row].key}`;
    }
    if (categoriesArray[searchCategory.row].key !== "") {
      url += `&category_id=${categoriesArray[searchCategory.row].key}`;
    }
    apiGet({
      url: url,
      token: session ? session?.token : "",
      then: (resp: AxiosResponse) => {
        if (resp.status !== 200) {
          showErrMsg(resp.data.error);
          return;
        }
        if (!resp.data.data) return;
        for (const v of resp.data.data) {
          v.key = v.jewellery_id;
          v.gem_name = getGems()[v.gem_id];
          v.material_name = getMaterials()[v.material_id];
          v.category_name = getCategories()[v.category_id].name;
          v.created_at = moment(v.created_at).format(Constant.dateFormat);
          v.updated_at = moment(v.updated_at).format(Constant.dateFormat);
        }
        setItems(resp.data.data);
        setTotalItemCount(resp.data.count);
      },
      onCatch: (e: AxiosError) => showErrMsg(e.message),
      onFinally: () => setLoading(false),
    });
  };

  useEffect(() => {
    fetch();
    setPage(0);
  }, [limit]);

  useEffect(() => fetch(), [sort, page]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          padding: 15,
          justifyContent: "space-between",
        }}
      >
        <CenterView
          body={
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {t("admin-management-jewellery")}
            </Text>
          }
        />

        <View style={{ flexDirection: "row" }}>
          <TextField
            width={"10%"}
            value={searchID}
            setValue={(v) => setSearchID(v)}
            placeholder={t("id")}
          />
          <View style={{ width: 10 }} />
          <TextField
            width={"10%"}
            value={searchName}
            setValue={(v) => setSearchName(v)}
            placeholder={t("name")}
          />
          <View style={{ width: 10 }} />
          <SelectField
            width={100}
            val={searchIsPublished}
            setValue={(v) => setSearchIsPublished(v)}
            items={Constant.trueFalseSelects || []}
            placeholder={t("is-published-placeholder")}
            itemDisplay={(v) =>
              v.key === "" ? t("is-published-placeholder") : v.key
            }
          />
          <View style={{ width: 10 }} />
          <SelectField
            width={100}
            val={searchGem}
            setValue={(v) => setSearchGem(v)}
            items={gemsArray || []}
            placeholder={t("gem-placeholder")}
            itemDisplay={(v) => v.value || t("gem-placeholder")}
          />
          <View style={{ width: 10 }} />
          <SelectField
            width={100}
            val={searchMaterial}
            setValue={(v) => setSearchMaterial(v)}
            items={materialsArray || []}
            placeholder={t("material-placeholder")}
            itemDisplay={(v) => v.value || t("material-placeholder")}
          />
          <View style={{ width: 10 }} />
          <SelectField
            width={100}
            val={searchCategory}
            setValue={(v) => setSearchCategory(v)}
            items={categoriesArray || []}
            itemDisplay={(v) =>
              (v.value && v.value.name) || t("category-placeholder")
            }
          />
          <View style={{ width: 10 }} />
          <IconBtn
            icon="plus-circle"
            size={30}
            onPress={() => setShowAddModal(true)}
          />
          <View style={{ width: 10 }} />
          <IconBtn icon="search" onPress={() => fetch()} size={30} />
        </View>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t("id")}</DataTable.Title>
          <DataTable.Title>{t("name")}</DataTable.Title>
          <DataTable.Title>{t("description")}</DataTable.Title>
          <DataTable.Title>{t("price")}</DataTable.Title>
          <DataTable.Title>{t("quantity")}</DataTable.Title>
          <DataTable.Title>{t("image")}</DataTable.Title>
          <DataTable.Title>{t("is-published")}</DataTable.Title>
          <DataTable.Title>{t("material")}</DataTable.Title>
          <DataTable.Title>{t("gem")}</DataTable.Title>
          <DataTable.Title>{t("category")}</DataTable.Title>
          <DataTable.Title
            sortDirection={
              sort === Constant.sorts.desc ? "descending" : "ascending"
            }
            onPress={() => {
              if (sort === Constant.sorts.desc) setSort(Constant.sorts.asc);
              else setSort(Constant.sorts.desc);
            }}
          >
            {t("created-at")}
          </DataTable.Title>
          <DataTable.Title>{t("updated-at")}</DataTable.Title>
          <DataTable.Title>{t("actions")}</DataTable.Title>
        </DataTable.Header>

        {loading && (
          <DataTable.Row>
            <Text style={{ paddingVertical: 10 }}>{t("loading")}...</Text>
          </DataTable.Row>
        )}

        {!loading &&
          items.map((v) => (
            <DataTable.Row key={v.key}>
              <DataTable.Cell
                onPress={() => Clipboard.setString(v.jewellery_id)}
              >
                <Text>{v.jewellery_id}</Text>
              </DataTable.Cell>
              <DataTable.Cell onPress={() => Clipboard.setString(v.name)}>
                <Text>{v.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.description}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.price}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.quantity}</Text>
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => {
                  setImage(v.image_url);
                  setShowImage(true);
                }}
              >
                <Image
                  source={{ uri: v.image_url }}
                  resizeMode={"contain"}
                  style={{
                    width: "100%",
                    height: 80,
                  }}
                />
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.is_published ? "True" : "False"}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.material_name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.gem_name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.category_name}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.created_at}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.updated_at}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <IconBtn
                  icon="edit"
                  size={30}
                  onPress={() => {
                    setEditDelModel(v);
                    setShowEditModal(true);
                  }}
                />
                <View style={{ width: 10 }} />
                <IconBtn
                  icon="trash"
                  size={30}
                  onPress={() => {
                    setEditDelModel(v);
                    setDelModal(true);
                  }}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(totalItemCount / limit)}
          label={`${from + 1}-${to} of ${totalItemCount}`}
          numberOfItemsPerPageList={Constant.limits}
          numberOfItemsPerPage={limit}
          onItemsPerPageChange={setLimit}
          showFastPaginationControls
          selectPageDropdownLabel={t("row-per-page")}
          onPageChange={(page) => setPage(page)}
        />
      </DataTable>

      <ErrorModal
        show={showErrModal}
        setShow={setShowErrModal}
        errMsg={errMsg}
      />

      <AddJewelleryModal
        show={showAddModal}
        setShow={setShowAddModal}
        onSuccess={() => fetch()}
      />

      <EditJewelleryModal
        dataModel={editDelModel}
        show={showEditModal}
        setShow={setShowEditModal}
        onSuccess={() => fetch()}
      />

      <DeleteJewelleryModal
        dataModel={editDelModel}
        show={delModal}
        setShow={setDelModal}
        onSuccess={() => fetch()}
      />

      <ImageViewerModal image={image} show={showImage} setShow={setShowImage} />
    </>
  );
}
