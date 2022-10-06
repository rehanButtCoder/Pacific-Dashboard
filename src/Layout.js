import React from "react";
import Sidebar from "./Sidebar/Sidebar";

const Layout = ({children}) => {
    return (
        <div>
            
        <Sidebar />
        {children}

        </div>
    );
}

export default Layout;