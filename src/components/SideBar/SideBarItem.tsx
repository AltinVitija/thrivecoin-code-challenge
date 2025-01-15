import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarItemProps {
  icon: any;
  label: string;
  path: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  label,
  path,
}) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 p-3 rounded-lg ${
          isActive
            ? "bg-blue-50 text-black-600"
            : "text-gray-500 hover:bg-gray-50"
        }`
      }>
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;
