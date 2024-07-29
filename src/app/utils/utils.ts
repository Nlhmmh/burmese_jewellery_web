abstract class Utils {
  static asCurrency(value: number) {
    if (!value) value = 0;
    return value.toLocaleString("ja-JP", {
      style: "decimal",
      currency: "JPY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
  }
}

export default Utils;
