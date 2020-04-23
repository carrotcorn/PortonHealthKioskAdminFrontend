import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,

    background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
  },
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Login' href='/login' />
        <Tab label='Appointment List' href='/appointmentlist' />
        <Tab label='Clinic List' href='/cliniclist' />
        <Tab label='Doctor List' href='/doctorlist' />

      </Tabs>
    </Paper>
  );
}

// return (
//   <header class='header'>
//     <a href='/' className='logo'>
//       Porton
//     </a>
//     <input class='menu-btn' type='checkbox' id='menu-btn' />
//     <label class='menu-icon' for='menu-btn'>
//       <span class='navicon' />
//     </label>
//     <ul class='menu'>
//       <li>
//         <a href='/'>Home</a>
//       </li>
//       {this.state.isAuthorized ? (
//         <ul></ul>
//       ) : (
//         <ul>
//           <li>
//             <a href='/login'>Login</a>
//             <br />
//             <a href='/appointmentlist'>Appointment List</a>
//             <br />
//             <a href='/cliniclist'>Clinic List</a>
//           </li>
//         </ul>
//       )}
//     </ul>
//   </header>
// );
