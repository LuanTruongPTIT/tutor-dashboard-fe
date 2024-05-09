import Header from "@/app/_component/Header";
import Sidebar from "@/app/_component/Sidebar";
import "react-datepicker/dist/react-datepicker.css";
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-full overflow-hidden">
        <Sidebar />
        <main className="w-full pt-14">{children}</main>
      </div>
    </>
  );
}
