import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
    const activeStyle = {color: "#F15B2A"};
    return (
        <nav>
            <NavLink to="/" activeStyle={activeStyle} exact>
                Home
            </NavLink>
            {" | "}
            <NavLink to="/config" activeStyle={activeStyle}>
                Configuration
            </NavLink>
        </nav>
    );
};

export default Header;
