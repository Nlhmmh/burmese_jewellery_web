export const parseEnums = (enums: any) => {
  let enumsParsed: any = {};
  if (!enums) return enumsParsed;
  for (const v of enums) {
    enumsParsed[v.enum_name] = {
      values: v.enum_value.split(","),
      selects: ["", ...v.enum_value.split(",")],
    };
  }
  return enumsParsed;
};
