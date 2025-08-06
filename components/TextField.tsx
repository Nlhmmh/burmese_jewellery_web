import { Icon, Input, Select, SelectItem } from "@ui-kitten/components";
import {
  IndexPath,
  TouchableWithoutFeedback,
} from "@ui-kitten/components/devsupport";
import { DimensionValue, Text, View } from "react-native";

function Label({
  label,
  extraBody,
}: {
  label: string;
  extraBody?: React.ReactNode;
}) {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text style={{ fontSize: 14, paddingBottom: 5 }}>{label}</Text>
      {extraBody}
    </View>
  );
}

export function TextField({
  value,
  setValue,
  label,
  placeholder,
  onBlur,
  width,
  height,
  disabled = false,
  multiline = false,
}: {
  value: string;
  setValue: (v: string) => void;
  label?: string;
  placeholder?: string;
  onBlur?: (e: any) => void;
  width?: DimensionValue | undefined;
  height?: DimensionValue | undefined;
  disabled?: boolean;
  multiline?: boolean;
}) {
  return (
    <Input
      label={() => {
        if (label) return <Label label={label} />;
        return <></>;
      }}
      placeholder={placeholder || ""}
      size="large"
      style={{ borderRadius: 5, width: width }}
      textStyle={{ height: height }}
      value={value}
      onChangeText={(v) => setValue(v)}
      onBlur={onBlur}
      disabled={disabled}
      multiline={multiline}
    />
  );
}

export function TextFieldSecure({
  value,
  setValue,
  show,
  setShow,
  label,
  placeholder,
  onBlur,
  width,
  disabled = false,
  extraBody,
  onSubmitEditing,
}: {
  value: string;
  setValue: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  label: string;
  placeholder?: string;
  onBlur: (e: any) => void;
  width?: DimensionValue | undefined;
  disabled?: boolean;
  extraBody?: React.ReactNode;
  onSubmitEditing?: (e: any) => void;
}) {
  return (
    <Input
      label={() => <Label label={label} extraBody={extraBody} />}
      placeholder={placeholder || ""}
      size="large"
      style={{ borderRadius: 5, flex: 1, width: width }}
      value={value}
      onChangeText={(v) => setValue(v)}
      secureTextEntry={show}
      accessoryRight={() => (
        <TouchableWithoutFeedback onPress={() => setShow(!show)}>
          <Icon pack="feather" name={show ? "eye-off" : "eye"} />
        </TouchableWithoutFeedback>
      )}
      onBlur={onBlur}
      disabled={disabled}
      onSubmitEditing={onSubmitEditing}
    />
  );
}

export function SelectField({
  val,
  setValue,
  items,
  width,
  label,
  placeholder,
  onBlur,
  itemDisplay = (v: any) => v,
}: {
  val: IndexPath;
  setValue: (v: any) => void;
  items: Array<any>;
  width?: DimensionValue | undefined;
  label?: string;
  placeholder?: string;
  onBlur?: (e: any) => void;
  itemDisplay?: (v: any) => string;
}) {
  return (
    <Select
      label={() => {
        if (label) return <Label label={label} />;
        return <></>;
      }}
      selectedIndex={val}
      onSelect={(v) => setValue(v)}
      value={
        !val
          ? placeholder
          : items.at(val.row) === ""
          ? placeholder
          : itemDisplay(items.at(val.row))
      }
      size="large"
      style={{ flex: 1, width: width, borderRadius: 10 }}
      onBlur={onBlur}
      placeholder={placeholder}
    >
      {items.map((v, i) => (
        <SelectItem key={i} title={itemDisplay(v)} />
      ))}
    </Select>
  );
}
