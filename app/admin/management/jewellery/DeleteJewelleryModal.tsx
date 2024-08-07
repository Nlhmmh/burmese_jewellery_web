import { useSession } from "@/auth/ctx";
import { MyDivider, TextRow } from "@/components/Misc";
import { ModalAction, ModalHeading, MyModal } from "@/components/Modals";
import { apiDel } from "@/utils/api";
import { AxiosError, AxiosResponse } from "axios";
import { t } from "i18next";
import { useState } from "react";
import { View } from "react-native";
import { HelperText } from "react-native-paper";
import { Jewellery } from "../jewellery";

export const DeleteJewelleryModal = ({
  dataModel,
  show,
  setShow,
  onSuccess,
}: {
  dataModel: Jewellery;
  show: boolean;
  setShow: (v: boolean) => void;
  onSuccess: () => void;
}) => {
  const { session } = useSession();
  const [errMsg, setErrMsg] = useState("");

  const onClickDelete = async () => {
    setErrMsg("");
    apiDel({
      url: `/api/admin/jewellery/${dataModel.jewellery_id}`,
      token: session?.token || "",
      then: (resp: AxiosResponse) => {
        if (resp.status !== 200) {
          if (!resp.data) return;
          setErrMsg(resp.data.message || resp.data.error || "");
          return;
        }
        setShow(false);
        onSuccess();
      },
      onCatch: (e: AxiosError) => setErrMsg(e.message),
    });
  };

  return (
    <MyModal
      show={show}
      setShow={setShow}
      body={
        <>
          <ModalHeading
            show={show}
            title={`${t("delete")} ${t("admin-management-jewellery")}`}
          />
          <View style={{ height: 20 }} />
          <MyDivider />
          <View style={{ height: 20 }} />

          <TextRow field={t("id")} value={dataModel.jewellery_id} />
          <View style={{ height: 5 }} />
          <TextRow field={t("name")} value={dataModel.name} />
          <View style={{ height: 5 }} />
          <TextRow
            field={t("is-published")}
            value={String(dataModel.is_published)}
          />
          <View style={{ height: 10 }} />

          {errMsg !== "" && <HelperText type="error">{errMsg}</HelperText>}
          <View style={{ height: 20 }} />

          <ModalAction
            cancelTitle={t("cancel")}
            okTitle={t("delete")}
            onCancel={() => setShow(false)}
            onOK={onClickDelete}
          />
        </>
      }
    />
  );
};
