import { Slot } from "expo-router";
import { AppNavBar } from "./AppNavBar";

export default function HomeLayout() {
  return (
    <>
      <AppNavBar />
      <Slot />
    </>
  );
}
