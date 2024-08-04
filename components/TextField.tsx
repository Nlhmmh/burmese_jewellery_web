import { Icon, Input, Select, SelectItem } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
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
  disabled = false,
}: {
  value: string;
  setValue: (v: string) => void;
  label?: string;
  placeholder?: string;
  onBlur?: (e: any) => void;
  width?: DimensionValue | undefined;
  disabled?: boolean;
}) {
  return (
    <Input
      label={() => {
        if (label) return <Label label={label} />;
        return <></>;
      }}
      placeholder={placeholder || ""}
      size="large"
      style={{ borderRadius: 10, flex: 1, width: width }}
      value={value}
      onChangeText={(v) => setValue(v)}
      onBlur={onBlur}
      disabled={disabled}
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
}) {
  return (
    <Input
      label={() => <Label label={label} extraBody={extraBody} />}
      placeholder={placeholder || ""}
      size="large"
      style={{ borderRadius: 10, flex: 1, width: width }}
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
    />
  );
}

export function SelectField({
  value,
  setValue,
  items,
  width,
  label,
  placeholder,
  onBlur,
}: {
  value: any;
  setValue: (v: any) => void;
  items: Array<string>;
  width?: DimensionValue | undefined;
  label?: string;
  placeholder?: string;
  onBlur?: (e: any) => void;
}) {
  return (
    <Select
      label={() => {
        if (label) return <Label label={label} />;
        return <></>;
      }}
      selectedIndex={value}
      onSelect={(v) => setValue(v)}
      value={items[value.row] === "" ? placeholder : items[value.row]}
      size="large"
      style={{ flex: 1, width: width }}
      onBlur={onBlur}
      placeholder={placeholder}
    >
      {items.map((v) => (
        <SelectItem key={v} title={v} />
      ))}
    </Select>
  );
}
