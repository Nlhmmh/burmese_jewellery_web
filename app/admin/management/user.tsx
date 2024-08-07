import { useSession } from "@/auth/ctx";
import { IconBtn } from "@/components/Button";
import { CenterView, TextRow } from "@/components/Misc";
import { ErrorModal } from "@/components/Modals";
import { SelectField, TextField } from "@/components/TextField";
import { Constant } from "@/constants/Constant";
import { apiGet } from "@/utils/api";
import { IndexPath } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { t } from "i18next";
import moment from "moment";
import { useEffect, useState } from "react";
import { Clipboard, Text, View } from "react-native";
import { DataTable } from "react-native-paper";
import { EditUserModal } from "./user/EditUserModal";

export interface Account {
  key: string;
  account: {
    account_id: string;
    mail: string;
    account_status: string;
    login_type: string;
    created_at: string;
    updated_at: string;
  };
  account_profile: {
    account_id: string;
    first_name: string;
    last_name: string;
    gender: string;
    birthday: string;
    created_at: string;
    updated_at: string;
  };
}

export default function AdminManagementUser() {
  const { getEnums, session } = useSession();
  const [enums] = useState(getEnums());
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(Constant.limits[0]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [sort, setSort] = useState(Constant.sorts.desc);
  const [items, setItems] = useState<Array<Account>>([]);
  const from = page * limit;
  const to = Math.min((page + 1) * limit, totalItemCount);
  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchFirstName, setSearchFirstname] = useState("");
  const [searchLastName, setSearchLastName] = useState("");
  const [searchStatus, setSearchStatus] = useState(new IndexPath(0));
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDelModel, setEditDelModel] = useState<Account>({
    key: "",
    account: {
      account_id: "",
      account_status: "",
      created_at: "",
      mail: "",
      updated_at: "",
      login_type: "",
    },
    account_profile: {
      created_at: "",
      updated_at: "",
      account_id: "",
      birthday: "",
      first_name: "",
      gender: "",
      last_name: "",
    },
  });

  const showErrMsg = (errMsg: string) => {
    setShowErrModal(true);
    setErrMsg(errMsg);
  };

  const fetch = () => {
    setLoading(true);
    let url = `/api/admin/account?offset=${from}&limit=${limit}&sort=${sort}`;
    if (searchID !== "") url += `&id=${searchID}`;
    if (searchFirstName !== "") url += `&first_name=${searchFirstName}`;
    if (searchLastName !== "") url += `&last_name=${searchLastName}`;
    if (enums.account_status.selects[searchStatus.row] !== "") {
      url += `&account_status=${
        enums.account_status.selects[searchStatus.row]
      }`;
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
          v.key = v.account.account_id;
          v.account.created_at = moment(v.created_at).format(
            Constant.dateFormat
          );
          v.account.updated_at = moment(v.updated_at).format(
            Constant.dateFormat
          );
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
              {t("admin-management-user")}
            </Text>
          }
        />

        <View style={{ flexDirection: "row" }}>
          <TextField
            value={searchID}
            setValue={(v) => setSearchID(v)}
            placeholder={t("id")}
          />
          <View style={{ width: 10 }} />
          <TextField
            value={searchFirstName}
            setValue={(v) => setSearchFirstname(v)}
            placeholder={t("first-name")}
          />
          <View style={{ width: 10 }} />
          <TextField
            value={searchLastName}
            setValue={(v) => setSearchLastName(v)}
            placeholder={t("last-name")}
          />
          <View style={{ width: 10 }} />
          <SelectField
            val={searchStatus}
            setValue={(v) => setSearchStatus(v)}
            items={enums.account_status.selects || []}
            placeholder={t("status-placeholder")}
          />
          <View style={{ width: 10 }} />
          <IconBtn icon="search" onPress={() => fetch()} size={30} />
        </View>
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title>{t("id")}</DataTable.Title>
          <DataTable.Title>{t("mail")}</DataTable.Title>
          <DataTable.Title>{t("login-type")}</DataTable.Title>
          <DataTable.Title>{t("status")}</DataTable.Title>
          <DataTable.Title style={{ flex: 1 }}>{t("profile")}</DataTable.Title>
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
          <DataTable.Title style={{ flex: 0.5 }}>
            {t("actions")}
          </DataTable.Title>
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
                onPress={() => Clipboard.setString(v.account.account_id)}
              >
                <Text>{v.account.account_id}</Text>
              </DataTable.Cell>
              <DataTable.Cell
                onPress={() => Clipboard.setString(v.account.mail)}
              >
                <Text>{v.account.mail}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.account.login_type}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.account.account_status}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                  <TextRow
                    field={t("first-name")}
                    value={v.account_profile.first_name}
                  />
                  <TextRow
                    field={t("last-name")}
                    value={v.account_profile.last_name}
                  />
                  <TextRow
                    field={t("gender")}
                    value={v.account_profile.gender}
                  />
                  <TextRow
                    field={t("birthday")}
                    value={v.account_profile.birthday}
                  />
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.account.created_at}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.account.updated_at}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 0.5 }}>
                <IconBtn
                  icon="edit"
                  size={30}
                  onPress={() => {
                    setEditDelModel(v);
                    setShowEditModal(true);
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

      <EditUserModal
        dataModel={editDelModel}
        show={showEditModal}
        setShow={setShowEditModal}
        onSuccess={() => fetch()}
      />
    </>
  );
}
