import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen w-full bg-background-light overflow-y-auto">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
