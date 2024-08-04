import { Modal } from "@ui-kitten/components";
import { t } from "i18next";
import { Text, View, ViewStyle } from "react-native";
import { PrimaryBtn } from "./Button";
import { MyAnimatedIcon } from "./Icons";

export function MyModal({
  show,
  setShow,
  body,
  justifyContent = "flex-start",
  style = {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  body: React.ReactNode;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
  style?: ViewStyle;
}) {
  return (
    <Modal
      visible={show}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      style={{
        width: "30%",
        backgroundColor: "white",
        justifyContent: justifyContent,
        borderRadius: 20,
        ...style,
      }}
      onBackdropPress={() => setShow(false)}
      children={body}
    />
  );
}

export function ErrorModal({
  show,
  setShow,
  errMsg,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  errMsg: string;
}) {
  return (
    <MyModal
      show={show}
      setShow={setShow}
      justifyContent="center"
      body={
        <>
          <MyAnimatedIcon
            animation="pulse"
            icon="times-circle"
            size={40}
            color="red"
            playToggle={show}
          />
          <View style={{ height: 30 }} />
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "red" }}>
            {t("error")}
          </Text>
          <View style={{ height: 10 }} />
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {errMsg}
          </Text>
          <View style={{ height: 30 }} />
          <PrimaryBtn title={t("ok")} onPress={() => setShow(false)} />
        </>
      }
    />
  );
}

export function ModalHeading({
  icon,
  show,
  title,
}: {
  icon?: string;
  show: boolean;
  title: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {icon && (
        <>
          <MyAnimatedIcon
            animation="pulse"
            icon={icon}
            size={30}
            color="black"
            playToggle={show}
          />
          <View style={{ width: 10 }} />
        </>
      )}
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>{title}</Text>
    </View>
  );
}

export function ModalAction({
  cancelTitle,
  okTitle,
  onCancel,
  onOK,
}: {
  cancelTitle: string;
  okTitle: string;
  onCancel: () => void;
  onOK: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <PrimaryBtn
        title={cancelTitle}
        onPress={onCancel}
        appearance="outline"
        width={"49%"}
      />
      <PrimaryBtn title={okTitle} onPress={onOK} width={"49%"} />
    </View>
  );
}
