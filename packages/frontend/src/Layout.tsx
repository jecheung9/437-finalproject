import { useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import Header from "./Header";

export function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();

    // different header layouts per page
    let headerProps = { title: "", createLink: false, homeLink: false };

    if (location.pathname === "/") {
        headerProps = { title: "Event Manager", createLink: true, homeLink: false };
    } else if (location.pathname === "/create") {
        headerProps = { title: "Create Event", createLink: false, homeLink: true };
    } else if (location.pathname === "/login") {
        headerProps = { title: "Event Manager: Login", createLink: false, homeLink: false };
    } else if (location.pathname === "/register") {
        headerProps = { title: "Event Manager: Register", createLink: false, homeLink: false };
    } else {
        headerProps = { title: "Event Details", createLink: false, homeLink: true };
    }

    return (
        <div className={darkMode ? "full dark" : "full"}>
            <Header
                {...headerProps}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
            />
            <main>
                <Outlet />
            </main>
        </div>
    );
}