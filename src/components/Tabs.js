import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Tabs.css";

function Tabs() {
    return (
      <nav className="tabs">
        <NavLink
          to="/trending"
          className="tabs__link"
          activeClassName="tabs__link_active">
          Trending
        </NavLink>
        <NavLink
          to="/search"
          className="tabs__link"
          activeClassName="tabs__link_active">
          Search
        </NavLink>
        <NavLink
          to="/random"
          className="tabs__link"
          activeClassName="tabs__link_active">
          Random
        </NavLink>
        <NavLink
          to="/upload"
          className="tabs__link"
          activeClassName="tabs__link_active">
          Upload
        </NavLink>
      </nav>
    );
}

export default Tabs;
