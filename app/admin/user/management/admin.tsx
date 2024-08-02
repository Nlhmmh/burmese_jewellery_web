import { useSession } from "@/auth/ctx";
import { IconBtn, PrimaryBtn } from "@/components/Button";
import { apiGet } from "@/utils/api";
import { Icon, Modal } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { DataTable } from "react-native-paper";

export default function Layout() {
  const { session } = useSession();
  const [page, setPage] = useState(0);
  const [limitList] = useState([1, 2, 5, 10]);
  const [limit, setLimit] = useState(limitList[0]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const from = page * limit;
  const to = Math.min((page + 1) * limit, totalItemCount);
  const [items, setItems] = useState<
    Array<{
      account_admin_id: string;
      account_admin_role: string;
      account_admin_status: string;
      created_at: string;
      key: string;
      mail: string;
      updated_at: string;
    }>
  >([]);
  const [showErrModal, setShowErrModal] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const errIconAni = useRef<any>();

  const fetchAccountAdmin = () => {
    apiGet({
      url: "/api/admin/account_admin?offset=" + from + "&limit=" + limit,
      token: session?.token,
      then: (resp: AxiosResponse) => {
        if (resp.status !== 200) {
          setShowErrModal(true);
          setErrMsg(resp.data);
          return;
        }
        if (!resp.data.data) return;
        for (const v of resp.data.data) {
          v.key = v.account_admin_id;
          v.created_at = moment(v.created_at).format(
            "YYYY-MM-DD HH:mm:ss Z ( ddd )"
          );
          v.updated_at = moment(v.updated_at).format(
            "YYYY-MM-DD HH:mm:ss Z ( ddd )"
          );
        }
        setItems(resp.data.data);
        setTotalItemCount(resp.data.count);
      },
      onCatch: (e: AxiosError) => {
        setShowErrModal(true);
        setErrMsg(e.message);
      },
    });
  };

  useEffect(() => {
    fetchAccountAdmin();
    setPage(0);
  }, [limit]);

  useEffect(() => {
    fetchAccountAdmin();
  }, [page]);

  useEffect(() => {
    if (errIconAni && errIconAni.current) errIconAni.current!.startAnimation();
  }, []);

  useEffect(() => {
    if (showErrModal === true)
      if (errIconAni && errIconAni.current)
        errIconAni.current!.startAnimation();
  }, [showErrModal]);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          paddingVertical: 15,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {"User Management Admin"}
        </Text>
        <IconBtn icon="reload" onPress={() => fetchAccountAdmin()} />
      </View>

      <DataTable>
        <DataTable.Header>
          <DataTable.Title sortDirection="descending">ID</DataTable.Title>
          <DataTable.Title>Mail</DataTable.Title>
          <DataTable.Title>Role</DataTable.Title>
          <DataTable.Title>Status</DataTable.Title>
          <DataTable.Title>Created At</DataTable.Title>
          <DataTable.Title>Updated At</DataTable.Title>
        </DataTable.Header>

        {items.map((v) => (
          <DataTable.Row key={v.key}>
            <DataTable.Cell>{v.account_admin_id}</DataTable.Cell>
            <DataTable.Cell>{v.mail}</DataTable.Cell>
            <DataTable.Cell>{v.account_admin_role}</DataTable.Cell>
            <DataTable.Cell>{v.account_admin_status}</DataTable.Cell>
            <DataTable.Cell>{v.created_at}</DataTable.Cell>
            <DataTable.Cell>{v.updated_at}</DataTable.Cell>
          </DataTable.Row>
        ))}

        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(totalItemCount / limit)}
          label={`${from + 1}-${to} of ${totalItemCount}`}
          numberOfItemsPerPageList={limitList}
          numberOfItemsPerPage={limit}
          onItemsPerPageChange={setLimit}
          showFastPaginationControls
          selectPageDropdownLabel={"Rows per page"}
          onPageChange={(page) => setPage(page)}
        />
      </DataTable>

      <Modal
        visible={showErrModal}
        backdropStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        style={{
          width: "30%",
          height: "30%",
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 20,
        }}
        onBackdropPress={() => setShowErrModal(false)}
      >
        <Icon
          pack="font-awesome-5"
          animationConfig={{
            cycles: Infinity,
            useNativeDriver: false,
          }}
          animation="pulse"
          name="times-circle"
          ref={errIconAni}
          style={[{ width: 40, height: 40, color: "red" }]}
        />
        <View style={{ height: 30 }} />
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "red",
          }}
        >
          {"Error"}
        </Text>
        <View style={{ height: 10 }} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {errMsg}
        </Text>
        <View style={{ height: 30 }} />
        <PrimaryBtn title="OK" onPress={() => setShowErrModal(false)} />
      </Modal>
    </>
  );
}
