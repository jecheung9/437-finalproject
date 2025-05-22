import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Outlet } from "react-router";
import Header from "./Header";

export function Layout() {
    const [darkMode, setDarkMode] = useState(false);
    const location = useLocation();


    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    let headerProps = { title: "", createLink: false, homeLink: false };

    if (location.pathname === "/") {
        headerProps = { title: "Event Manager", createLink: true, homeLink: false };
    } else if (location.pathname === "/create") {
        headerProps = { title: "Create Event", createLink: false, homeLink: true };
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