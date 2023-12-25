import React from 'react';
import Header from "./components/header/Header";

function DefaultLayout({children}) {
    return (
        <div className="app-blank">
            <Header/>
            {children}
        </div>
    );
}

export default DefaultLayout;
