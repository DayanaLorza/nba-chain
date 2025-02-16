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
import GridItem from "components/Grid/GridItem.js";
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
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="warning" stats icon>
                    <CardIcon color="warning">
                      <Icon>content_copy</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Used Space</p>
                    <h3 className={classes.cardTitle}>
                      49/50 <small>GB</small>
                    </h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Danger>
                        <Warning />
                      </Danger>
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        Get more space
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="success" stats icon>
                    <CardIcon color="success">
                      <Store />
                    </CardIcon>
                    <p className={classes.cardCategory}>Revenue</p>
                    <h3 className={classes.cardTitle}>$34,245</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <DateRange />
                      Last 24 Hours
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="danger" stats icon>
                    <CardIcon color="danger">
                      <Icon>info_outline</Icon>
                    </CardIcon>
                    <p className={classes.cardCategory}>Fixed Issues</p>
                    <h3 className={classes.cardTitle}>75</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <LocalOffer />
                      Tracked from Github
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={3}>
                <Card>
                  <CardHeader color="info" stats icon>
                    <CardIcon color="info">
                      <Accessibility />
                    </CardIcon>
                    <p className={classes.cardCategory}>Followers</p>
                    <h3 className={classes.cardTitle}>+245</h3>
                  </CardHeader>
                  <CardFooter stats>
                    <div className={classes.stats}>
                      <Update />
                      Just Updated
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="success">
                    <ChartistGraph
                      className="ct-chart"
                      data={dailySalesChart.data}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Daily Sales</h4>
                    <p className={classes.cardCategory}>
                      <span className={classes.successText}>
                        <ArrowUpward className={classes.upArrowCardCategory} />{" "}
                        55%
                      </span>{" "}
                      increase in today sales.
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> updated 4 minutes ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="warning">
                    <ChartistGraph
                      className="ct-chart"
                      data={emailsSubscriptionChart.data}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={
                        emailsSubscriptionChart.responsiveOptions
                      }
                      listener={emailsSubscriptionChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                    <p className={classes.cardCategory}>
                      Last Campaign Performance
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> campaign sent 2 days ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <ChartistGraph
                      className="ct-chart"
                      data={completedTasksChart.data}
                      type="Line"
                      options={completedTasksChart.options}
                      listener={completedTasksChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 className={classes.cardTitle}>Completed Tasks</h4>
                    <p className={classes.cardCategory}>
                      Last Campaign Performance
                    </p>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <AccessTime /> campaign sent 2 days ago
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <CustomTabs
                  title="Tasks:"
                  headerColor="primary"
                  tabs={[
                    {
                      tabName: "Bugs",
                      tabIcon: BugReport,
                      tabContent: (
                        <Tasks
                          checkedIndexes={[0, 3]}
                          tasksIndexes={[0, 1, 2, 3]}
                          tasks={bugs}
                        />
                      )
                    },
                    {
                      tabName: "Website",
                      tabIcon: Code,
                      tabContent: (
                        <Tasks
                          checkedIndexes={[0]}
                          tasksIndexes={[0, 1]}
                          tasks={website}
                        />
                      )
                    },
                    {
                      tabName: "Server",
                      tabIcon: Cloud,
                      tabContent: (
                        <Tasks
                          checkedIndexes={[1]}
                          tasksIndexes={[0, 1, 2]}
                          tasks={server}
                        />
                      )
                    }
                  ]}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
                    <p className={classes.cardCategoryWhite}>
                      New employees on 15th September, 2016
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="warning"
                      tableHead={["ID", "Name", "Salary", "Country"]}
                      tableData={[
                        ["1", "Dakota Rice", "$36,738", "Niger"],
                        ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                        ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                        ["4", "Philip Chaney", "$38,735", "Korea, South"]
                      ]}
                    />
                  </CardBody>
                </Card>
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
