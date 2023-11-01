import DashboardSkeleton from "@/app/ui/skeletons";
import { FC, PropsWithChildren } from "react";

const DashboardLoading: FC<PropsWithChildren> = () => {
  return <DashboardSkeleton />;
};

export default DashboardLoading;
