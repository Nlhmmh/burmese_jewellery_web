import { Constant } from "@/constants/Constant";
import axios, { AxiosError, AxiosResponse } from "axios";

const isDebug = true;

interface APIGetProps {
  url: string;
  token?: string | undefined;
  then: (resp: AxiosResponse) => void;
  onCatch?: (e: AxiosError) => void;
  onFinally?: () => void;
}

export const apiGet = async (props: APIGetProps) => {
  return await axios
    .get(Constant.apiURL + props.url, {
      headers: {
        Authorization:
          props.token && props.token !== "" ? "Bearer " + props.token : null,
      },
      validateStatus: (status) => status < 500,
    })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      props.then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (props.onCatch) props.onCatch(e);
    })
    .finally(() => {
      if (props.onFinally) props.onFinally();
    });
};

interface APIProps {
  url: string;
  data?: any;
  token?: string | undefined;
  then: (resp: AxiosResponse) => void;
  onCatch?: (e: AxiosError) => void;
  onFinally?: () => void;
}

const callAPI = async (method: string, props: APIProps) => {
  return await axios({
    method: method,
    url: Constant.apiURL + props.url,
    data: props.data,
    headers: {
      Authorization:
        props.token && props.token !== "" ? "Bearer " + props.token : null,
    },
    validateStatus: (status) => status < 500,
  })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      props.then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (props.onCatch) props.onCatch(e);
    })
    .finally(() => {
      if (props.onFinally) props.onFinally();
    });
};

export const apiPostFormData = async (props: APIProps) => {
  return await axios
    .postForm(Constant.apiURL + props.url, props.data, {
      headers: {
        Authorization:
          props.token && props.token !== "" ? "Bearer " + props.token : null,
      },
      validateStatus: (status) => status < 500,
    })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      props.then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (props.onCatch) props.onCatch(e);
    })
    .finally(() => {
      if (props.onFinally) props.onFinally();
    });
};

export const apiPostUploadFile = async (props: APIProps) => {
  const fileData = await fetch(props.data.uri);
  const fileBlob = await fileData.blob();
  return await axios
    .postForm(
      Constant.apiURL + props.url,
      { file: fileBlob },
      {
        headers: {
          Authorization:
            props.token && props.token !== "" ? "Bearer " + props.token : null,
        },
        validateStatus: (status) => status < 500,
      }
    )
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      props.then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (props.onCatch) props.onCatch(e);
    })
    .finally(() => {
      if (props.onFinally) props.onFinally();
    });
};

export const apiPost = async (props: APIProps) => {
  return await callAPI("POST", props);
};

export const apiPut = async (props: APIProps) => {
  return await callAPI("PUT", props);
};

export const apiDel = async (props: APIProps) => {
  return await callAPI("DELETE", props);
};
