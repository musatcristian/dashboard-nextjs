import SideNav from "@/app/ui/dashboard/sidenav";
import { Metadata } from "next/types";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: {
    template: "%s | Acme Dashboard",
    default: "Acme Dashboard",
  },
};

const DashBoardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
};

export default DashBoardLayout;
