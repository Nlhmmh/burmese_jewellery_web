export const fromObjToArray = (vList: any) => {
  const array = [];
  for (const v in vList) {
    array.push({
      key: v,
      value: vList[v],
    });
  }
  return array;
};

export const numberOnly = (text: string) => {
  return Number(text.replace(/[^0-9]/g, ""));
};

export const fromObjToArrayWithDefault = (vList: any) => {
  const array = [
    {
      key: "",
      value: undefined,
    },
  ];
  for (const v in vList) {
    array.push({
      key: v,
      value: vList[v],
    });
  }
  return array;
};
