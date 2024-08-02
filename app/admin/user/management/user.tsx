import { useSession } from "@/auth/ctx";
import { IconBtn } from "@/components/Button";
import { CenterView } from "@/components/Misc";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { DataTable } from "react-native-paper";

interface Account {
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

export default function Layout() {
  const { session } = useSession();
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
  const [searchStatus, setSearchStatus] = useState(new IndexPath(0));

  const showErrMsg = (errMsg: string) => {
    setShowErrModal(true);
    setErrMsg(errMsg);
  };

  const fetch = () => {
    setLoading(true);
    let url = `/api/admin/account?offset=${from}&limit=${limit}&sort=${sort}`;
    if (searchID !== "") url += `&id=${searchID}`;
    if (Constant.roles[searchStatus.row] !== "")
      url += `&account_status=${Constant.statuss[searchStatus.row]}`;
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
          v.key = v.account_admin_id;
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
              {t("admin-user-management-user")}
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
          <SelectField
            value={searchStatus}
            setValue={(v) => setSearchStatus(v)}
            items={Constant.statuss}
            label={t("unselected")}
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
          <DataTable.Title>{t("first-name")}</DataTable.Title>
          <DataTable.Title>{t("last-name")}</DataTable.Title>
          <DataTable.Title>{t("gender")}</DataTable.Title>
          <DataTable.Title>{t("birthday")}</DataTable.Title>
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
        </DataTable.Header>

        {loading && (
          <DataTable.Row>
            <Text style={{ paddingVertical: 10 }}>{t("loading")}...</Text>
          </DataTable.Row>
        )}

        {!loading &&
          items.map((v) => (
            <DataTable.Row key={v.key}>
              <DataTable.Cell>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    onPress={() => Clipboard.setString(v.account.account_id)}
                    activeOpacity={0.5}
                  >
                    <Text style={{ fontSize: 12 }}>{v.account.account_id}</Text>
                  </TouchableOpacity>
                </View>
              </DataTable.Cell>
              <DataTable.Cell>
                <TouchableOpacity
                  onPress={() => Clipboard.setString(v.account.mail)}
                  activeOpacity={0.5}
                >
                  {v.account.mail}
                </TouchableOpacity>
              </DataTable.Cell>
              <DataTable.Cell>{v.account.login_type}</DataTable.Cell>
              <DataTable.Cell>{v.account.account_status}</DataTable.Cell>
              <DataTable.Cell>{v.account_profile.first_name}</DataTable.Cell>
              <DataTable.Cell>{v.account_profile.last_name}</DataTable.Cell>
              <DataTable.Cell>{v.account_profile.gender}</DataTable.Cell>
              <DataTable.Cell>{v.account_profile.birthday}</DataTable.Cell>
              <DataTable.Cell>{v.account.created_at}</DataTable.Cell>
              <DataTable.Cell>{v.account.updated_at}</DataTable.Cell>
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
    </>
  );
}
