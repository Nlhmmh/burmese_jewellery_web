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
import { DataTable } from "react-native-paper";

interface AccountAdmin {
  account_admin_id: string;
  account_admin_role: string;
  account_admin_status: string;
  created_at: string;
  key: string;
  mail: string;
  updated_at: string;
}

export default function Layout() {
  const { getEnums, session } = useSession();
  const [enums] = useState(getEnums());
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(Constant.limits[0]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [sort, setSort] = useState(Constant.sorts.desc);
  const [items, setItems] = useState<Array<AccountAdmin>>([]);
  const from = page * limit;
  const to = Math.min((page + 1) * limit, totalItemCount);
  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchID, setSearchID] = useState("");
  const [searchMail, setSearchMail] = useState("");
  const [searchRole, setSearchRole] = useState(new IndexPath(0));
  const [searchStatus, setSearchStatus] = useState(new IndexPath(0));

  const showErrMsg = (errMsg: string) => {
    setShowErrModal(true);
    setErrMsg(errMsg);
  };

  const fetch = () => {
    setLoading(true);
    let url = `/api/admin/account_admin?offset=${from}&limit=${limit}&sort=${sort}`;
    if (searchID !== "") url += `&id=${searchID}`;
    if (searchMail !== "") url += `&mail=${searchMail}`;
    if (enums.account_admin_role.selects[searchRole.row] !== "") {
      url += `&account_admin_role=${
        enums.account_admin_role.selects[searchRole.row]
      }`;
    }
    if (enums.account_admin_status.selects[searchStatus.row] !== "") {
      url += `&account_admin_status=${
        enums.account_admin_status.selects[searchStatus.row]
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
              {t("admin-user-management-admin")}
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
            value={searchMail}
            setValue={(v) => setSearchMail(v)}
            placeholder={t("mail")}
          />
          <View style={{ width: 10 }} />
          <SelectField
            value={searchRole}
            setValue={(v) => setSearchRole(v)}
            items={enums.account_admin_role.selects || []}
            label={t("unselected")}
          />
          <View style={{ width: 10 }} />
          <SelectField
            value={searchStatus}
            setValue={(v) => setSearchStatus(v)}
            items={enums.account_admin_status.selects || []}
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
          <DataTable.Title>{t("role")}</DataTable.Title>
          <DataTable.Title>{t("status")}</DataTable.Title>
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
              <DataTable.Cell
                onPress={() => Clipboard.setString(v.account_admin_id)}
              >
                <Text>{v.account_admin_id}</Text>
              </DataTable.Cell>
              <DataTable.Cell onPress={() => Clipboard.setString(v.mail)}>
                <Text>{v.mail}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.account_admin_role}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.account_admin_status}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.created_at}</Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text>{v.updated_at}</Text>
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
    </>
  );
}
