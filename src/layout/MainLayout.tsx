import React from "react";
import Sidebar from "../components/SideBar/SideBar";
import Header from "../components/header/Header";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
