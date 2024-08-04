import { useSession } from "@/auth/ctx";
import { MailTextField } from "@/components/Forms";
import { MyDivider, TextRow } from "@/components/Misc";
import { ModalAction, ModalHeading, MyModal } from "@/components/Modals";
import { SelectField } from "@/components/TextField";
import { apiPut } from "@/utils/api";
import { IndexPath } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { Card, HelperText } from "react-native-paper";
import { Account } from "../user";

export const EditUserModal = ({
  dataModel,
  show,
  setShow,
  onSuccess,
}: {
  dataModel: Account;
  show: boolean;
  setShow: (v: boolean) => void;
  onSuccess: () => void;
}) => {
  const { session, getEnums } = useSession();
  const [enums] = useState(getEnums());
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    defaultValues: {
      accountStatus: new IndexPath(0),
    },
  });
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!show) return;
    setValue(
      "accountStatus",
      new IndexPath(
        enums.account_status.selects.indexOf(dataModel.account.account_status)
      )
    );
  }, [dataModel]);

  const onClickEdit = async (formData: { accountStatus: IndexPath }) => {
    setErrMsg("");
    apiPut({
      url: `/api/admin/account/${dataModel.account.account_id}`,
      token: session?.token || "",
      data: {
        account_status:
          enums.account_status.selects[formData.accountStatus.row],
      },
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
            title={`${t("edit")} ${t("admin-management-admin")}`}
          />
          <View style={{ height: 20 }} />
          <MyDivider />
          <View style={{ height: 20 }} />

          <Card
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <TextRow field={t("id")} value={dataModel.account.account_id} />
            <View style={{ height: 5 }} />
            <TextRow field={t("mail")} value={dataModel.account.mail} />
            <View style={{ height: 5 }} />
            <TextRow
              field={t("login-type")}
              value={dataModel.account.login_type}
            />
            <View style={{ height: 5 }} />
            <TextRow
              field={t("status")}
              value={dataModel.account.account_status}
            />
          </Card>
          <View style={{ height: 5 }} />
          <Card
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
            }}
          >
            <TextRow
              field={t("first-name")}
              value={dataModel.account_profile.first_name}
            />
            <View style={{ height: 5 }} />
            <TextRow
              field={t("last-name")}
              value={dataModel.account_profile.last_name}
            />
            <View style={{ height: 5 }} />
            <TextRow
              field={t("gender")}
              value={dataModel.account_profile.gender}
            />
            <View style={{ height: 5 }} />
            <TextRow
              field={t("birthday")}
              value={dataModel.account_profile.birthday}
            />
            <View style={{ height: 5 }} />
          </Card>
          <View style={{ height: 20 }} />

          <Controller
            name="accountStatus"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectField
                value={value}
                setValue={(v) => onChange(v)}
                items={enums.account_status.selects || []}
                label={t("status")}
                onBlur={onBlur}
                placeholder={t("status-placeholder")}
              />
            )}
          />
          {errors.accountStatus?.type === "required" && (
            <HelperText type="error">{t("status-required")}</HelperText>
          )}
          <View style={{ height: 10 }} />

          {errMsg !== "" && <HelperText type="error">{errMsg}</HelperText>}
          <View style={{ height: 20 }} />

          <ModalAction
            cancelTitle={t("cancel")}
            okTitle={t("edit")}
            onCancel={() => setShow(false)}
            onOK={handleSubmit(onClickEdit)}
          />
        </>
      }
    />
  );
};
