import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ListItemLink from "./utilities/ListItemLink";
import { Route } from "react-router";
import { UserContext } from "./Contexts";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const navLinks = [
  { path: "/", name: "Home", icon: <HomeIcon /> }, // no role = no restriction
  {
    path: "/clinics",
    name: "Clinics",
    roles: ["admin"],
    icon: <LocalHospitalIcon />,
  },
  {
    path: "/appointments",
    name: "Appointments",
    roles: ["clinic"],
    icon: <AssignmentIcon />,
  },
  {
    path: "/configuration",
    name: "Configuration",
    roles: ["clinic"],
    icon: <SettingsIcon />,
  },
];

function Layout(props) {
  const { window, children } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const userContext = useContext(UserContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {navLinks
          .filter(({ roles }) => {
            if (!roles) {
              return true;
            } else {
              for (let role of roles) {
                if (userContext.user && userContext.user.roles.includes(role)) {
                  return true;
                }
              }
              return false;
            }
          })
          .map(({ path, name, icon }) => (
            <ListItemLink key={path} to={path} primary={name} icon={icon} />
          ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={userContext.user ? classes.appBar : null}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Route>
            {({ location }) => {
              let title = "";
              if (location.pathname === "/login") {
                title = "Login";
              } else if (location.pathname === "/logout") {
                title = "Logout";
              } else {
                const matchingRoutes = navLinks.filter(
                  (link) => link.path === location.pathname
                );

                title =
                  matchingRoutes.length > 0
                    ? matchingRoutes[0].name
                    : "Not Found";
              }
              return (
                <Typography variant="h5" gutterBottom>
                  {title}
                </Typography>
              );
            }}
          </Route>
        </Toolbar>
      </AppBar>
      {userContext.user && (
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="js">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="js">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
export default Layout;
