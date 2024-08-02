import { Modal } from "@ui-kitten/components";
import { MyAnimatedIcon } from "./Icons";
import { Text, View } from "react-native";
import { t } from "i18next";
import { PrimaryBtn } from "./Button";

export function MyModal({
  show,
  setShow,
  body,
}: {
  show: boolean;
  setShow: (v: boolean) => void;
  body: React.ReactNode;
}) {
  return (
    <Modal
      visible={show}
      backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      style={{
        width: "30%",
        height: "30%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        padding: 10,
      }}
      onBackdropPress={() => setShow(false)}
    >
      {body}
    </Modal>
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
