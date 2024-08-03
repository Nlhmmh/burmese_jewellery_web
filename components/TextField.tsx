import { Icon, Input, Select, SelectItem } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { Text } from "react-native";

function Label({ label }: { label: string }) {
  return <Text style={{ fontSize: 14, paddingBottom: 5 }}>{label}</Text>;
}

export function TextField({
  value,
  setValue,
  label,
  placeholder,
  onBlur,
}: {
  value: string;
  setValue: (v: string) => void;
  label?: string;
  placeholder?: string;
  onBlur?: (e: any) => void;
}) {
  return (
    <Input
      label={() => {
        if (label) return <Label label={label} />;
        return <></>;
      }}
      placeholder={placeholder || ""}
      size="large"
      style={{ borderRadius: 10 }}
      value={value}
      onChangeText={(v) => setValue(v)}
      onBlur={onBlur}
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
}: {
  value: string;
  setValue: (v: string) => void;
  show: boolean;
  setShow: (v: boolean) => void;
  label: string;
  placeholder?: string;
  onBlur: (e: any) => void;
}) {
  return (
    <Input
      label={() => <Label label={label} />}
      placeholder={placeholder || ""}
      size="large"
      style={{ borderRadius: 10 }}
      value={value}
      onChangeText={(v) => setValue(v)}
      secureTextEntry={show}
      accessoryRight={() => (
        <TouchableWithoutFeedback onPress={() => setShow(!show)}>
          <Icon pack="feather" name={show ? "eye-off" : "eye"} />
        </TouchableWithoutFeedback>
      )}
    />
  );
}

export function SelectField({
  value,
  setValue,
  items,
  width = 200,
  label,
}: {
  value: any;
  setValue: (v: any) => void;
  items: Array<string>;
  width?: number;
  label: string;
}) {
  return (
    <Select
      selectedIndex={value}
      onSelect={(v) => setValue(v)}
      value={items[value.row] === "" ? label : items[value.row]}
      size="large"
      style={{ width: width }}
    >
      {items.map((v) => (
        <SelectItem key={v} title={v} />
      ))}
    </Select>
  );
}
