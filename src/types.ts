import { ReactNode } from "react";

export type Props = {
  params: { locale: string };
};

export type PageProps = {
  children: ReactNode;
  params: { locale: string };
};
