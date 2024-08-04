import { useSession } from "@/auth/ctx";
import { IconBtn } from "@/components/Button";
import { MailTextField, PasswordTextField } from "@/components/Forms";
import { MyDivider } from "@/components/Misc";
import { ModalAction, ModalHeading, MyModal } from "@/components/Modals";
import { SelectField, TextFieldSecure } from "@/components/TextField";
import { apiPut } from "@/utils/api";
import { IndexPath } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";
import { AccountAdmin } from "../admin";

export const EditAdminUserModal = ({
  dataModel,
  show,
  setShow,
  onSuccess,
}: {
  dataModel: AccountAdmin;
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
      mail: "",
      pw: "",
      pwConfirm: "",
      accountAdminRole: new IndexPath(0),
      accountAdminStatus: new IndexPath(0),
    },
  });
  const [showPW, setShowPW] = useState(true);
  const [showPWConfirm, setShowPWConfirm] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [pwDisabled, setPWDisabled] = useState(true);

  useEffect(() => {
    if (!show) return;
    setValue("mail", dataModel.mail);
    setValue("pw", "");
    setValue("pwConfirm", "");
    setValue(
      "accountAdminRole",
      new IndexPath(
        enums.account_admin_role.selects.indexOf(dataModel.account_admin_role)
      )
    );
    setValue(
      "accountAdminStatus",
      new IndexPath(
        enums.account_admin_status.selects.indexOf(
          dataModel.account_admin_status
        )
      )
    );
  }, [dataModel]);

  const onClickEdit = async (formData: {
    mail: string;
    pw: string;
    pwConfirm: string;
    accountAdminRole: IndexPath;
    accountAdminStatus: IndexPath;
  }) => {
    setErrMsg("");
    apiPut({
      url: `/api/admin/account_admin/${dataModel.account_admin_id}`,
      token: session?.token || "",
      data: {
        // password: formData.pw,
        account_admin_role:
          enums.account_admin_role.selects[formData.accountAdminRole.row],
        account_admin_status:
          enums.account_admin_status.selects[formData.accountAdminStatus.row],
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
            title={`${t("edit")} ${t("admin-user-management-admin")}`}
          />
          <View style={{ height: 20 }} />
          <MyDivider />
          <View style={{ height: 20 }} />

          {/* ------------- Mail */}
          <MailTextField control={control} errors={errors} disabled={true} />
          <View style={{ height: 20 }} />

          {/* ------------- Password */}
          <PasswordTextField
            control={control}
            errors={errors}
            showPW={showPW}
            setShowPW={setShowPW}
            disabled={pwDisabled}
            extraBody={
              <>
                <View style={{ width: 10 }} />
                <IconBtn
                  icon="pencil"
                  onPress={() => setPWDisabled(!pwDisabled)}
                />
              </>
            }
          />
          <View style={{ height: 20 }} />

          {/* ------------- Password Confirm */}
          <Controller
            name="pwConfirm"
            control={control}
            rules={{
              required: !pwDisabled,
              validate: (v) => {
                if (v !== getValues("pw"))
                  return t("Password confirm must be the same as the password");
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextFieldSecure
                value={value}
                setValue={(v) => onChange(v)}
                show={showPWConfirm}
                setShow={(v) => setShowPWConfirm(v)}
                label={t("pw-confirm")}
                placeholder={t("pw-confirm-placeholder")}
                onBlur={onBlur}
                disabled={pwDisabled}
              />
            )}
          />
          {errors.pwConfirm?.type === "required" && (
            <HelperText type="error">{t("pw-confirm-required")}</HelperText>
          )}
          {errors.pwConfirm?.type === "validate" && (
            <HelperText type="error">{t("pw-confirm-validate")}</HelperText>
          )}
          <View style={{ height: 10 }} />

          <Controller
            name="accountAdminRole"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectField
                value={value}
                setValue={(v) => onChange(v)}
                items={enums.account_admin_role.selects || []}
                label={t("role")}
                onBlur={onBlur}
                placeholder={t("role-placeholder")}
              />
            )}
          />
          {errors.accountAdminRole?.type === "required" && (
            <HelperText type="error">{t("role-required")}</HelperText>
          )}
          <View style={{ height: 10 }} />

          <Controller
            name="accountAdminStatus"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <SelectField
                value={value}
                setValue={(v) => onChange(v)}
                items={enums.account_admin_status.selects || []}
                label={t("status")}
                onBlur={onBlur}
                placeholder={t("status-placeholder")}
              />
            )}
          />
          {errors.accountAdminStatus?.type === "required" && (
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
