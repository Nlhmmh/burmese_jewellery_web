import { useSession } from "@/auth/ctx";
import { MailTextField, PasswordTextField } from "@/components/Forms";
import { MyDivider } from "@/components/Misc";
import { ModalAction, ModalHeading, MyModal } from "@/components/Modals";
import { SelectField, TextFieldSecure } from "@/components/TextField";
import { apiPost } from "@/utils/api";
import { IndexPath } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { t } from "i18next";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

export const AddAdminUserModal = ({
  show,
  setShow,
  onSuccess,
}: {
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

  const onClickAdd = async (formData: {
    mail: string;
    pw: string;
    pwConfirm: string;
    accountAdminRole: IndexPath;
    accountAdminStatus: IndexPath;
  }) => {
    setErrMsg("");
    apiPost({
      url: "/api/admin/account_admin",
      token: session?.token || "",
      data: {
        mail: formData.mail,
        password: formData.pw,
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
            title={`${t("add")} ${t("admin-management-admin")}`}
          />
          <View style={{ height: 20 }} />
          <MyDivider />
          <View style={{ height: 20 }} />

          {/* ------------- Mail */}
          <MailTextField control={control} errors={errors} />
          <View style={{ height: 20 }} />

          {/* ------------- Password */}
          <PasswordTextField
            control={control}
            errors={errors}
            showPW={showPW}
            setShowPW={setShowPW}
          />
          <View style={{ height: 20 }} />

          {/* ------------- Password Confirm */}
          <Controller
            name="pwConfirm"
            control={control}
            rules={{
              required: true,
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
                val={value}
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
                val={value}
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
            okTitle={t("add")}
            onCancel={() => setShow(false)}
            onOK={handleSubmit(onClickAdd)}
          />
        </>
      }
    />
  );
};
