import React from 'react';
import Dashboard from "../screens/dashboard/Dashboard";
import App from "../App";
import HomePage from "../screens/dashboard/HomePage";

function RouteRef(props) {
    return (
        <>
            {/*bottom navigator*/}
            <Dashboard/>

            {/* stack screens */}
            <App/>

            {/*drawer*/}
            <HomePage/>

        </>
    );
}

