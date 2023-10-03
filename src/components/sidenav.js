import React from "react";
import { removeProfile } from "../actions/userActions";
import { connect } from "react-redux";
import "./sdashboard.css";
import LogoSvgSynat from "../components/img/logo.jpeg";

function Sidenav(props) {
  const TCentre = props.TCentre;
  const onclick = () => {
    props.removeProfile();
  };
  return (
    <div>
      <nav className="navigation">
        <ul>
        <a href="/tutorhome">
            <img src={LogoSvgSynat} 
            alt="SYNAT"
            width="150" 
            height="100"/>
            </a>
            <br/>

    
          <li>
            <a href="/mystudents">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">My Students</span>
            </a>
          </li>

          <li>
            <a href="/mymodules">
              <span className="icon">
                <ion-icon name="book-outline"></ion-icon>
              </span>
              <span className="title">My Modules</span>
            </a>
          </li>
          <li>
            <a href="/toTutor">
              <span className="icon">
                <ion-icon name="school-outline"></ion-icon>
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
