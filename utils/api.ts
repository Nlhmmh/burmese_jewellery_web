import { Constant } from "@/constants/Constant";
import axios, { AxiosError, AxiosResponse } from "axios";

const isDebug = true;

export interface APIGetProps {
  url: string;
  token: string | undefined;
  then: (resp: AxiosResponse) => void;
  onCatch?: (e: AxiosError) => void;
  onFinally?: () => void;
}

export const apiGet = ({
  url,
  token,
  then,
  onCatch,
  onFinally,
}: APIGetProps) => {
  axios
    .get(Constant.apiURL + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      validateStatus: (status) => status < 500,
    })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (onCatch) onCatch(e);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};

export interface APIPostProps {
  url: string;
  data: any;
  token: string | undefined;
  then: (resp: AxiosResponse) => void;
  onCatch?: (e: AxiosError) => void;
  onFinally?: () => void;
}

export interface APIDelProps {
  url: string;
  token: string | undefined;
  then: (resp: AxiosResponse) => void;
  onCatch?: (e: AxiosError) => void;
  onFinally?: () => void;
}

export const apiPost = ({
  url,
  data,
  token,
  then,
  onCatch,
  onFinally,
}: APIPostProps) => {
  axios
    .post(Constant.apiURL + url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
      validateStatus: (status) => status < 500,
    })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (onCatch) onCatch(e);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};

export const apiPut = ({
  url,
  data,
  token,
  then,
  onCatch,
  onFinally,
}: APIPostProps) => {
  axios
    .put(Constant.apiURL + url, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
      validateStatus: (status) => status < 500,
    })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (onCatch) onCatch(e);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};

export const apiDel = ({
  url,
  token,
  then,
  onCatch,
  onFinally,
}: APIDelProps) => {
  axios
    .delete(Constant.apiURL + url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      validateStatus: (status) => status < 500,
    })
    .then((resp: AxiosResponse) => {
      if (isDebug) console.log(resp);
      then(resp);
    })
    .catch((e: AxiosError) => {
      console.error(e);
      if (onCatch) onCatch(e);
    })
    .finally(() => {
      if (onFinally) onFinally();
    });
};
