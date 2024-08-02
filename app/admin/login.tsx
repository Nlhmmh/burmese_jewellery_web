import { useSession } from "@/auth/ctx";
import { PrimaryBtn } from "@/components/Button";
import { TextField, TextFieldSecure } from "@/components/TextField";
import { Constant } from "@/constants/Constant";
import { Card } from "@ui-kitten/components";
import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { HelperText } from "react-native-paper";

export default function AdminLoginScreen() {
  const [showPW, setShowPW] = useState(true);
  const { signIn } = useSession();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      // mail: "admin8@gmail.com",
      // pw: "admin",
      mail: "",
      pw: "",
    },
  });
  const [errMsg, setErrMsg] = useState("");

  const onClickLogin = async (formData: { mail: string; pw: string }) => {
    setErrMsg("");
    axios
      .post(
        Constant.apiURL + "/api/admin/login",
        {
          mail: formData.mail,
          password: formData.pw,
        },
        {
          validateStatus: (status) => {
            return status < 500;
          },
        }
      )
      .then((resp: AxiosResponse) => {
        if (resp.status !== 200) {
          setErrMsg((resp.data && resp.data.message) || "");
          return;
        }
        signIn(resp.data, true);
        router.push("/admin/dashboard");
      })
      .catch((e: AxiosError) => {
        console.debug(e.response);
        console.debug(e);
      })
      .finally(() => {});
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
        {/* ------------- mail */}
        <Controller
          name="mail"
          control={control}
          rules={{
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
            maxLength: 255,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              value={value}
              setValue={(v) => onChange(v)}
              label="Mail Address"
              placeholder="Enter your mail"
              onBlur={onBlur}
            />
          )}
        />
        {errors.mail?.type === "required" && (
          <HelperText type="error">{"Email is required"}</HelperText>
        )}
        {errors.mail?.type === "pattern" && (
          <HelperText type="error">{"Email is invalid"}</HelperText>
        )}
        <View style={{ height: 20 }} />

        {/* ------------- Password */}
        <Controller
          name="pw"
          control={control}
          rules={{
            required: true,
            minLength: 5,
            maxLength: 20,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextFieldSecure
              value={value}
              setValue={(v) => onChange(v)}
              show={showPW}
              setShow={(v) => setShowPW(v)}
              label="Password"
              placeholder="Enter your password"
              onBlur={onBlur}
            />
          )}
        />
        {errors.pw?.type === "required" && (
          <HelperText type="error">{"Password is required"}</HelperText>
        )}
        {(errors.pw?.type === "minLength" ||
          errors.pw?.type === "maxLength") && (
          <HelperText type="error">
            {"Password must be between 5 and 20 characters"}
          </HelperText>
        )}
        <View style={{ height: 10 }} />

        {errMsg !== "" && <HelperText type="error">{errMsg}</HelperText>}
        <View style={{ height: 10 }} />

        {/* ------------- Login Btn */}
        <PrimaryBtn title="Login" onPress={handleSubmit(onClickLogin)} />
      </Card>
    </View>
  );
}
