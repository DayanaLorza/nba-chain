import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect, Router, Link } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";

// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import PlayerContainer from "components/Sidebar/PlayerContainer.js";
import GridContainer from "components/Grid/GridContainer.js";
import Lootbox from "layouts/LootBox.js";

import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Button from "components/CustomButtons/Button.js";
import routes from "routes.js";
import Spinner from "./Spinner.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";
import "assets/css/material-dashboard-react.css";

import bgImage from "assets/img/bg2.jpg";
import logo from "assets/img/reactlogo.png";
let ps;

const useStyles = makeStyles(styles);
export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = useState(bgImage);
  const [color, setColor] = useState("blue");
  const [accounts, setAccounts] = useState("");
  const [fixedClasses, setFixedClasses] = useState("dropdown show");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(null);
  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    // setAccounts({ account: accounts[0] });
  };
  const getPlayers = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://nameless-eyrie-55441.herokuapp.com/api/splayer`
    );

    setPlayers(res.data);
    setLoading(false);
  };
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  const onClick = () => {
    getPlayers();
  };
  const buyLootBox = props => {
    return (window.location.pathname = "/lootbox");
  };
  useEffect(() => {
    loadBlockchainData();
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });

      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"NBA Chain"}
        logo={logo}
        image={image}
        handleDrawerToggl
        e={handleDrawerToggle}
        open={mobileOpen}
        color="black"
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <GridContainer>
            <div className="dash-nav">
              <Button color="white" aria-label="edit" onClick={onClick}>
                Load Players
              </Button>

              <Button
                className="loot-gold"
                aria-label="edit"
                onClick={buyLootBox}
              >
                Buy Loot Box
              </Button>
            </div>
            <GridContainer>
              <GridItem>
                <h2>The World's first fantasy league on the Blockchain.</h2>
              </GridItem>
            </GridContainer>
          </GridContainer>
          {loading ? (
            <GridContainer>
              <Spinner></Spinner>
            </GridContainer>
          ) : (
            <GridContainer>
              <PlayerContainer name players={players}></PlayerContainer>
            </GridContainer>
          )}
          <GridContainer>
            <Switch>
              {routes.map((prop, key) => {
                const path = prop.path;
                return (
                  <Route
                    path={path}
                    component={prop.component}
                    key={key}
                    name
                    players={players}
                  />
                );
              })}
              {/* <Redirect from="/admin" to="/admin/dashboard" /> */}
            </Switch>
          </GridContainer>
        </div>
        {getRoute() ? <Footer /> : null}
      </div>
    </div>
  );
}
