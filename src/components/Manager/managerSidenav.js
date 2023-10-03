import React from "react";
import { removeProfile } from "../../actions/userActions";
import { connect } from "react-redux";
import "../sdashboard.css";
import LogoSvgSynat from "../img/logo.jpeg";
function Sidenav(props) {
  const MCentre = props.MCentre;
  const onclick = () => {
    props.removeProfile();
  }
  return (
    <div className="mx-auto ">
      <nav className="navigation">
        <ul>
        <a href="/tutorhome">
            <img src={LogoSvgSynat} 
            alt="SYNAT"
            width="150" 
            height="100"/>
            </a>
            <br/>



          <li className="bi bi-person-plus">
            <a href="/tutorapplication">
              <span className="icon">
                <ion-icon name="person-add-outline"></ion-icon>
              </span>
              <span className="title">Tutor Applications</span>
            </a>
          </li>
          <li>
            <a href="/modules">
              <span className="icon">
                <ion-icon name="book-outline"></ion-icon>
              </span>
              <span className="title"> Modules</span>
            </a>
          </li>
          <li>
            <a href="/myTutors">
              <span className="icon">
                <ion-icon name="people-outline"></ion-icon>
              </span>
              <span className="title">Synat Tutors </span>
            </a>
          </li>
          <li>
            <a href="/reguser">
              <span className="icon">
                <ion-icon name="add-circle-outline"></ion-icon>
              </span>
              <span className="title"> Register Users</span>
            </a>
          </li>

          <li>
            <a href="/myMprofile">
              <span className="icon">
                <img src="public/imgs/customer01.jpg" alt="" />
                <ion-icon name="person-outline"></ion-icon>
              </span>
              <span className="title">Profile</span>
            </a>
          </li>
          <li>
            <a href="/studentpayments">
              <span className="icon">
                <ion-icon name="cash-outline"></ion-icon>
              </span>
              <span className="title">Students Payments</span>
            </a>
          </li>
          <li>
            <a href="/stats">
              <span className="icon">
                <ion-icon name="bar-chart-outline"></ion-icon>
              </span>
              <span className="title">Reports</span>
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

      <MCentre />
      <br/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
      {/* <div className="main container myfooter ">
       
      </div> */}
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