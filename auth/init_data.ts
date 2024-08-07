import { apiGet } from "@/utils/api";
import { AxiosResponse } from "axios";

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

export const parseGems = (values: any) => {
  let parsed: any = {};
  if (!values) return parsed;
  for (const v of values) {
    parsed[v.gem_id] = v.name;
  }
  return parsed;
};

export const parseMaterials = (values: any) => {
  let parsed: any = {};
  if (!values) return parsed;
  for (const v of values) {
    parsed[v.material_id] = v.name;
  }
  return parsed;
};

export const parseCategories = (values: any) => {
  let parsed: any = {};
  if (!values) return parsed;
  for (const v of values) {
    parsed[v.category_id] = {
      description: v.description,
      image_url: v.image_url,
      name: v.name,
    };
  }
  return parsed;
};

export const getDataFromAPI = async (
  url: string,
  setData: (v: string) => void,
  parseData: (v: any) => any
) => {
  await apiGet({
    url: url,
    then: (resp: AxiosResponse) => {
      if (resp.status !== 200) return;
      setData(JSON.stringify(parseData(resp.data)));
    },
  });
};

export const fetchInitDate = async (
  setEnums: (v: string) => void,
  setGems: (v: string) => void,
  setMaterials: (v: string) => void,
  setCategories: (v: string) => void
) => {
  await getDataFromAPI("/api/enums", setEnums, parseEnums);
  await getDataFromAPI("/api/gem", setGems, parseGems);
  await getDataFromAPI("/api/material", setMaterials, parseMaterials);
  await getDataFromAPI("/api/category", setCategories, parseCategories);
};
