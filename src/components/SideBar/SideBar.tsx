import React, { useState } from "react";
import { Grid, ArrowRight, Settings, LogOut, Menu, X } from "lucide-react";
import SidebarItem from "./SideBarItem";
import thriveImage from "../../assets/thrive.jpeg";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Sidebar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const items = [
    { icon: Grid, label: "Dashboard", path: "/dashboard" },
    { icon: ArrowRight, label: "Details", path: "/details/" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Log out", path: "/logout" },
  ];

  return (
    <div>
      <div className="lg:hidden fixed top-6 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-gray-100 shadow-lg">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-6 z-40 transform transition-transform lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div
          className={`flex items-center gap-2 mb-12 ${
            isMobile ? "ml-10" : ""
          }`}>
          <div className="w-10 h-10 rounded-lg">
            <img src={thriveImage} alt="Thrive Coin" className="rounded-full" />
          </div>
          <span className="text-xl font-bold">Thrive Coin</span>
        </div>

        <nav className="space-y-4">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              label={item.label}
              path={item.path}
              onClick={() => isMobile && setIsMobileMenuOpen(false)}
            />
          ))}
        </nav>
      </div>
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default Sidebar;
