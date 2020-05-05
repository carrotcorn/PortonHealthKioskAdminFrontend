import React from "react";
import AppointmentList from "./components/AppointmentList";
import ClinicList from "./components/ClinicList";
import PageNotFound from "./components/PageNotFound";
import Layout from "./Layout";
import { Route, Switch } from "react-router-dom";

function App(props) {
  return (
    <Layout>
      <Switch>
        <Route exact path="/appointments" component={AppointmentList} />
        <Route exact path="/clinics" component={ClinicList} />
        <Route path="*" component={PageNotFound} />
        {/* <Route exact path="/AddClinic" component={AddClinic} /> */}
        {/* <Route exact path="/DoctorList" component={DoctorList} /> */}
        {/* <Route exact path="/AddDoctor" component={AddDoctor} /> */}
      </Switch>
    </Layout>
  );
}

export default App;

// import React, { Component } from "react";
// import Navbar from "./utilities/Navbar";
// import Login from "./components/Login";
// import Footer from "./utilities/Footer";
// import AppointmentList from "./components/AppointmentList";
// import ClinicList from "./components/ClinicList";
// import AddClinic from "./components/AddClinic";
// import DoctorList from "./components/DoctorList";
// import AddDoctor from "./components/AddDoctor";
// import DynamicCheckin from "./components/DynamicCheckin";

// export default class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isAuthorized: false,
//     };
//   }
//   componentDidMount() {
//     console.log("start");
//     if (sessionStorage.getItem("isAuthorized") === "yes") {
//       this.setState({ isAuthorized: true });
//     }
//   }
//   render() {
//     const isAllowed = sessionStorage.getItem("isAuthorized");
//     console.log(`isAllowed: ${isAllowed}`);

//     return (
//       <div className="App">
//         <div>
//           <Navbar />
//           <Route path="/" />
//           {this.state.isAuthorized ? (
//             <div>
//               <Route exact path="/DynamicCheckin" component={DynamicCheckin} />

//               <Route
//                 exact
//                 path="/AppointmentList"
//                 component={AppointmentList}
//               />
//               <Route exact path="/ClinicList" component={ClinicList} />
//               <Route exact path="/AddClinic" component={AddClinic} />
//               <Route exact path="/DoctorList" component={DoctorList} />
//               <Route exact path="/AddDoctor" component={AddDoctor} />
//             </div>
//           ) : (
//             <div>
//               <Route exact path="/" component={Login} />
//               <Route exact path="/Login" component={Login} />
//             </div>
//           )}
//         </div>
//         <Footer />
//       </div>
//     );
//   }
// }
