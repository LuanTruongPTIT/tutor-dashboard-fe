import Header from "@/app/_component/Header";
import Sidebar from "@/app/_component/Sidebar";
import { Suspense } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Loading from "../loading";
import { Toaster } from "@/components/ui/toaster";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <Header />
        <main className="w-full pt-14">{children}</main>
      </div>
    </>
  );
}
