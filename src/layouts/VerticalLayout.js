import React, { useEffect, useState, useRef } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useRouteMatch } from "react-router-dom";
import Sidebar from "./components/menu/vertical-menu/Sidebar";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import {
  changeMode,
  collapseSidebar,
  changeNavbarColor,
  changeNavbarType,
  changeFooterType,
  changeMenuColor,
  hideScrollToTop,
} from "../redux/actions/customizer";
import { useContextData } from "./context/AppContext";
import Widget from "./components/chatwidget/Widget";

const VerticalLayout = ({ children, permission }) => {
  const value = useContextData();

  const dispatch = useDispatch();
  const location = useLocation();
  const match = useRouteMatch();
  const { pathname } = location;

  const {
    theme,
    direction,
    sidebarCollapsed,
    navbarColor,
    navbarType,
    footerType,
    menuTheme,
    hideScrollToTop: scrollToTop,
  } = useSelector((state) => state.customizer);

  const [width, setWidth] = useState(window.innerWidth);
  // const [sidebarState, setSidebarState] = useState(sidebarCollapsed);
  // const [collapsedContent, setCollapsedContent] = useState(sidebarCollapsed);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [appOverlay, setAppOverlay] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);

  const collapsedPaths = useRef([]);
  const mounted = useRef(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", updateWidth);
    }

    if (collapsedPaths.current.includes(pathname)) {
      dispatch(collapseSidebar(false));
    }

    if (direction === "rtl") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }

    if (theme === "dark") {
      document.body.classList.add("dark-layout");
    } else if (theme === "semi-dark") {
      document.body.classList.add("semi-dark-layout");
    }

    return () => {
      mounted.current = false;
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    if (!mounted.current) return;

    // Layout theme
    if (theme === "dark") {
      document.body.classList.remove("semi-dark-layout");
      document.body.classList.add("dark-layout");
    } else if (theme === "semi-dark") {
      document.body.classList.remove("dark-layout");
      document.body.classList.add("semi-dark-layout");
    } else {
      document.body.classList.remove("dark-layout", "semi-dark-layout");
    }

    // Sidebar collapse logic
    if (value.sidebar === null) {
      value.setSidebar(false);
    }
    // if (sidebarCollapsed !== collapsedContent) {
    //   setCollapsedContent(sidebarCollapsed);
    //   setSidebarState(sidebarCollapsed);
    // }

    if (collapsedPaths.current.includes(pathname)) {
      dispatch(collapseSidebar(true));
    } else {
      dispatch(collapseSidebar(false));
    }
  }, [pathname, sidebarCollapsed, theme]);

  const updateWidth = () => {
    if (mounted.current) {
      setWidth(window.innerWidth);
    }
  };

  const toggleSidebarMenu = () => {
    // const newState = !sidebarState;
    // setSidebarState(newState);
    // setCollapsedContent(newState);
    value.setSidebar(!value.sidebar);
  };

  const sidebarMenuHover = (val) => {
    value.setSidebar(val);
  };

  const handleSidebarVisibility = () => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", () => {
        if (sidebarHidden) {
          setSidebarHidden(!sidebarHidden);
        }
      });
    }
    setSidebarHidden(!sidebarHidden);
  };

  const handleCollapsedMenuPaths = (item) => {
    if (!collapsedPaths.current.includes(item)) {
      collapsedPaths.current.push(item);
    }
  };

  const handleAppOverlayInput = (value) => {
    setAppOverlay(value.length > 0);
  };

  const handleAppOverlayClick = () => {
    setAppOverlay(false);
  };

  const sidebarProps = {
    toggleSidebarMenu: () => dispatch(collapseSidebar(!sidebarCollapsed)),
    toggle: toggleSidebarMenu,
    sidebarState: value.sidebar,
    sidebarHover: sidebarMenuHover,
    sidebarVisibility: handleSidebarVisibility,
    visibilityState: sidebarHidden,
    activePath: match.path,
    collapsedMenuPaths: handleCollapsedMenuPaths,
    currentLang,
    activeTheme: menuTheme,
    collapsed: value.sidebar,
    permission,
    deviceWidth: width,
  };

  const navbarProps = {
    ...sidebarProps,
    currentLang,
    changeCurrentLang: setCurrentLang,
    handleAppOverlay: handleAppOverlayInput,
    appOverlayState: appOverlay,
    navbarColor,
    navbarType,
  };

  const footerProps = {
    footerType,
    hideScrollToTop: scrollToTop,
  };

  const customizerProps = {
    customizerState: customizerOpen,
    handleCustomizer: setCustomizerOpen,
    changeMode: (val) => dispatch(changeMode(val)),
    changeNavbar: (val) => dispatch(changeNavbarColor(val)),
    changeNavbarType: (val) => dispatch(changeNavbarType(val)),
    changeFooterType: (val) => dispatch(changeFooterType(val)),
    changeMenuTheme: (val) => dispatch(changeMenuColor(val)),
    collapseSidebar: (val) => dispatch(collapseSidebar(val)),
    hideScrollToTop: (val) => dispatch(hideScrollToTop(val)),
    activeMode: theme,
    activeNavbar: navbarColor,
    navbarType,
    footerType,
    menuTheme,
    scrollToTop,
    sidebarState: sidebarCollapsed,
  };

  const menuThemeArr = [
    "primary",
    "success",
    "danger",
    "info",
    "warning",
    "dark",
  ];

  return (
    <div
      className={classnames(`wrapper vertical-layout theme-${menuTheme}`, {
        "menu-collapsed": value.sidebar && width >= 1200,
        "fixed-footer": footerType === "sticky",
        "navbar-static": navbarType === "static",
        "navbar-sticky": navbarType === "sticky",
        "navbar-floating": navbarType === "floating",
        "navbar-hidden": navbarType === "hidden",
        "theme-primary": !menuThemeArr.includes(menuTheme),
      })}
    >
      <Sidebar {...sidebarProps} />
      <div
        className={classnames("app-content content custom-nav", {
          "show-overlay": appOverlay,
        })}
        onClick={handleAppOverlayClick}
      >
        <Navbar {...navbarProps} />
        <div className="content-wrapper coustom-wrapper">
          {children}

          {/* <Widget /> */}
        </div>
      </div>
      <Footer {...footerProps} />
      {/* {!disableCustomizer && <Customizer {...customizerProps} />} */}
    </div>
  );
};

export default VerticalLayout;
