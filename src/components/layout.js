import React from "react";

import { userReducer } from "../reducers/userReducer";
import { removeProfile } from "../actions/userActions";
import { connect } from "react-redux";
import "./sdashboard.css";
import LogoSynat from "../components/img/logo.jpeg";



function Sidebar(props) {
  const Centre = props.Centre;

  const logOut = () => {
    props.removeProfile();
  };

  return (
    
    <div className="mx-auto">
      
      <nav className="navigation ">
        <ul>
        <a href="/studentHome">
            <img src={LogoSynat} 
            alt="SYNAT"
            width="150" 
            height="100"/>
            </a>
            <br/>

          <li>
            <a href="/NoticeBoard">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Home</span>
            </a>
          </li>

          <li>
            <a href="/classes">
              <span className="icon">
                <ion-icon name="book-outline"></ion-icon>
              </span>
              <span className="title">My Modules</span>
            </a>
          </li>
          <li>
            <a href="/offered">
              <span className="icon">
                <ion-icon name="school-outline"></ion-icon>
              </span>
              <span className="title">Add module</span>
            </a>
          </li>
    

          <li>
            <a href="/myprofile">
              <span className="icon">
                <img src="public/imgs/customer01.jpg" alt="" />
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className="title">Profile</span>
            </a>
          </li>

          <li>
            <a href="/login" onClick={logOut}>
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </nav>

      <Centre />

      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeProfile: () => {
      dispatch(removeProfile());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
