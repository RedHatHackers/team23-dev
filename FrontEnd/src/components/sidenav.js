import React from "react";
import { removeProfile } from "../actions/userActions";
import { connect } from "react-redux";
import "./sdashboard.css";

function Sidenav(props) {
  const TCentre = props.TCentre;
  const onclick = () => {
    props.removeProfile();
  };
  return (
    <div>
      <nav className="navigation">
        <ul>
          <li>
            <a href="/tutorhome">
              <img
                className="imgbox"
                src="public/imgs/logo.jpeg"
                href="/home"
                alt=""
              ></img>
              <h1 className="title">SYNAT</h1>
            </a>
          </li>

          <li>
            <a href="/home">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Home</span>
            </a>
          </li>

          <li>
            <a href="/mystudents">
              <span className="icon">
                <ion-icon name="school-outline"></ion-icon>
              </span>
              <span className="title">My Students</span>
            </a>
          </li>

          <li>
            <a href="/mymodules">
              <span className="icon">
                <ion-icon name="mark-outline"></ion-icon>
              </span>
              <span className="title">My Modules</span>
            </a>
          </li>
          <li>
            <a href="/toTutor">
              <span className="icon">
                <ion-icon name="meeting-outline"></ion-icon>
              </span>
              <span className="title">All Modules</span>
            </a>
          </li>

          <li>
            <a href="/tutorprofile">
              <span className="icon">
                <img src="public/imgs/customer01.jpg" alt="" />
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className="title">My Profile</span>
            </a>
          </li>

          <li>
            <a href="/login" onClick={onclick}>
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </a>
          </li>
        </ul>
      </nav>

      <TCentre />
    
  
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
export default connect(mapStateToProps, mapDispatchToProps)(Sidenav);
