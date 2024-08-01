import { Button } from "@ui-kitten/components";

export function PrimaryBtn({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <Button style={{ borderRadius: 10 }} size="large" onPress={onPress}>
      {title}
    </Button>
  );
}
