import { AdminNavBar } from "@/app/admin/AdminNavBar";
import { Slot } from "expo-router";

export default function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <Slot />
    </>
  );
}
