import { Constant } from "@/constants/Constant";
import { t } from "i18next";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { HelperText } from "react-native-paper";
import { TextField, TextFieldSecure } from "./TextField";

export function MailTextField({
  control,
  errors,
  disabled = false,
}: {
  control: Control<any>;
  errors: FieldErrors;
  disabled?: boolean;
}) {
  return (
    <>
      <Controller
        name="mail"
        control={control}
        rules={{
          required: true,
          pattern: Constant.mailCheckPattern,
          maxLength: 255,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            value={value}
            setValue={(v) => onChange(v)}
            label={t("mail")}
            placeholder={t("mail-placeholder")}
            onBlur={onBlur}
            disabled={disabled}
          />
        )}
      />
      {errors.mail?.type === "required" && (
        <HelperText type="error">{t("mail-required")}</HelperText>
      )}
      {errors.mail?.type === "pattern" && (
        <HelperText type="error">{t("mail-invalid")}</HelperText>
      )}
    </>
  );
}

export function PasswordTextField({
  control,
  errors,
  showPW,
  setShowPW,
  disabled = false,
  extraBody,
}: {
  control: Control<any>;
  errors: FieldErrors;
  showPW: boolean;
  setShowPW: (v: boolean) => void;
  disabled?: boolean;
  extraBody?: React.ReactNode;
}) {
  return (
    <>
      <Controller
        name="pw"
        control={control}
        rules={{
          required: !disabled,
          minLength: 5,
          maxLength: 20,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextFieldSecure
            value={value}
            setValue={(v) => onChange(v)}
            show={showPW}
            setShow={(v) => setShowPW(v)}
            label={t("pw")}
            placeholder={t("pw-placeholder")}
            onBlur={onBlur}
            disabled={disabled}
            extraBody={extraBody}
          />
        )}
      />
      {errors.pw?.type === "required" && (
        <HelperText type="error">{t("pw-required")}</HelperText>
      )}
      {(errors.pw?.type === "minLength" || errors.pw?.type === "maxLength") && (
        <HelperText type="error">{t("pw-length")}</HelperText>
      )}
    </>
  );
}
