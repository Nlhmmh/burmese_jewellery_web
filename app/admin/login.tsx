import { useSession } from "@/auth/ctx";
import { PrimaryBtn } from "@/components/Button";
import { MailTextField, PasswordTextField } from "@/components/Forms";
import { apiPost } from "@/utils/api";
import { Card } from "@ui-kitten/components";
import { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

export default function AdminLoginScreen() {
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // mail: "admin@gmail.com",
      // pw: "admin",
      mail: "",
      pw: "",
    },
  });
  const [showPW, setShowPW] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const onClickLogin = async (formData: { mail: string; pw: string }) => {
    setErrMsg("");
    apiPost({
      url: "/api/admin/login",
      token: "",
      data: {
        mail: formData.mail,
        password: formData.pw,
      },
      then: (resp: AxiosResponse) => {
        if (resp.status !== 200) {
          setErrMsg((resp.data && resp.data.message) || "");
          return;
        }
        signIn(resp.data, true);
        router.push("/admin/dashboard");
      },
      onCatch: (e: AxiosError) => {
        setErrMsg(e.message);
      },
      onFinally: () => {},
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          width: "50%",
          padding: 20,
          borderRadius: 20,
        }}
      >
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
        <View style={{ height: 10 }} />

        {errMsg !== "" && <HelperText type="error">{errMsg}</HelperText>}
        <View style={{ height: 10 }} />

        {/* ------------- Login Btn */}
        <PrimaryBtn title={t("login")} onPress={handleSubmit(onClickLogin)} />
      </Card>
    </View>
  );
}
