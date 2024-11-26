import { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router";
import Sidebar from "../Components/Dashboard/DashboardSidebar";
import { BsList } from "react-icons/bs";

export default function SellerDashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setOpenSidebarToggle(false);  // Close sidebar when clicking outside
    }
  };

  useEffect(() => {
    if (openSidebarToggle) {
      // Add event listener when sidebar is open
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when sidebar is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up the event listener
    };
  }, [openSidebarToggle]);

  
  return (
    <div className={`flex min-h-screen justify-between  md:gap-48`}>
      {/* Sidebar */}
      <div>
          <Sidebar />
      </div>

      {/* Render child routes */}
      <div className=" w-full">
        <Outlet />
      </div>
    </div>
  );
}
