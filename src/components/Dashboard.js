import React, { useRef, useEffect, useState } from "react";
import "./Dashboard.css";
import { FaLock } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const loadTableauScript = (callback) => {
  const script = document.createElement("script");
  script.src = "https://public.tableau.com/javascripts/api/tableau-2.9.2.min.js";
  script.onload = () => {
    console.log("Tableau script loaded");
    callback();
  };
  script.onerror = () => {
    console.error("Error loading Tableau script");
  };
  document.body.appendChild(script);
};

function Dashboard({ userRole, isAuthenticated }) {
  const [dashboardData, setDashboardData] = useState(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  const rolePermissions = {
    "Admin": { 
      canViewAdminDashboard: true, 
      canViewManagerDashboard: true, 
      canViewEngineerDashboard: true,
      canViewOperatorDashboard: true 
    }, 
    "Production-Manager": { 
      canViewAdminDashboard: false, 
      canViewManagerDashboard: true, 
      canViewEngineerDashboard: false, 
      canViewOperatorDashboard: false 
    }, 
    "Quality control Engineer": { 
      canViewAdminDashboard: false, 
      canViewManagerDashboard: false, 
      canViewEngineerDashboard: true, 
      canViewOperatorDashboard: false 
    }, 
    "Operator": { 
      canViewAdminDashboard: false, 
      canViewManagerDashboard: false, 
      canViewEngineerDashboard: false, 
      canViewOperatorDashboard: true 
    },
  };

  const url1 = "https://public.tableau.com/shared/DYG5Z4D29";
  const url2 = "https://public.tableau.com/views/steelprod/ProductionManager";
  const url3 = "https://public.tableau.com/views/steelqcstory/QC";
  const url4 = "https://public.tableau.com/views/steelop/Operator";

  useEffect(() => {
    console.log("Refs:", ref1.current, ref2.current, ref3.current, ref4.current);
    if (!isAuthenticated) {
      console.log("User is not authenticated");
      return;
    }

    const permissions = rolePermissions[userRole];
    console.log("User Role:", userRole);
    console.log("Permissions:", permissions);

    const initializeDashboards = () => {
      try {
        if (permissions?.canViewAdminDashboard) {
          console.log("Initializing Admin Dashboards");
          new window.tableau.Viz(ref1.current, url1, { width: "100%", height: "100%" });
        } else if (permissions?.canViewManagerDashboard && ref2.current) {
          console.log("Initializing Manager Dashboard");
          new window.tableau.Viz(ref2.current, url2, { width: "100%", height: "100%" });
        } else if (userRole === "Quality control Engineer") {
          console.log("Initializing Engineer Dashboards");
          new window.tableau.Viz(ref3.current, url3, { width: "100%", height: "100%" });
        } else if (permissions?.canViewOperatorDashboard && ref4.current) {
          console.log("Initializing Operator Dashboard");
          new window.tableau.Viz(ref4.current, url4, { width: "100%", height: "100%" });
        } else {
          setDashboardData("You do not have access to any dashboards.");
          console.log("No access to any dashboard.");
        }
      } catch (error) {
        console.error("Error initializing Tableau Viz:", error);
      }
    };

    if (!window.tableau) {
      loadTableauScript(initializeDashboards);
    } else {
      initializeDashboards();
    }
  }, [userRole, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="auth-prompt">
        <div className="auth-prompt-content">
          <FaLock size={50} color="red" />
          <h2 className="auth-title">Access Restricted</h2>
          <p className="auth-message">
            Please Signin or Signup to access the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="dashboard-container">
      {userRole === "Admin" && (
        <>
        <div class="dashboard-heading">
          <h3 id="dash-h3">Admin Dashboard</h3></div>
          <div className="dashboard-panel admin-dashboard" ref={ref1}></div>
        </>
      )}
      {userRole === "Production-Manager" && (
        <>
        <div class="dashboard-heading">
          <h3 id="dash-h3">Production Manager Dashboard</h3></div>
          <div className="dashboard-panel manager-dashboard" ref={ref2}></div>
        </>
      )}
      {userRole === "Quality control Engineer" && (
        <>
        <div class="dashboard-heading">
          <h3 id="dash-h3">Quality Control Engineer Dashboard</h3></div>
          <div className="dashboard-panel engineer-dashboard" ref={ref3}></div>
        </>
      )}
      {userRole === "Operator" && (
        <>
        <div class="dashboard-heading">
          <h3 id="dash-h3">Operator Dashboard</h3></div>
          <div className="dashboard-panel operator-dashboard" ref={ref4}></div>
        </>
      )}
      {dashboardData && <p className="dashboard-message">{dashboardData}</p>}
    </div>
  );
}

export default Dashboard;
