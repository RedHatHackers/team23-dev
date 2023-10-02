import React from "react";
import { removeProfile } from "../../actions/userActions";
import { connect } from "react-redux";
import "../sdashboard.css";

function Sidenav(props) {
  const MCentre = props.MCentre;
  const onclick = () => {
    props.removeProfile();
  }
  return (
    <div className="mx-auto ">
      <nav className="navigation">
        <ul>
          <li>
            <a href="/tutorhome">
              <img className="imgbox"
                src="public/imgs/logo.jpeg"
                href="/home"
                alt="">

              </img>
              <h1 className="title"><a href="/home">SYNAT</a></h1>

            </a>
          </li>

          <li>
            <a href="/#">
              <span className="icon">
                <ion-icon name="home-outline"></ion-icon>
              </span>
              <span className="title">Home</span>
            </a>
          </li>

          <li>
            <a href="/tutorapplication">
              <span className="icon">
                <ion-icon name="signature-outline"></ion-icon>
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
                <ion-icon name="cloud-plus-outline"></ion-icon>
              </span>
              <span className="title"> Register Users</span>
            </a>
          </li>

          <li>
            <a href="/#">
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
                <ion-icon name="signature-outline"></ion-icon>
              </span>
              <span className="title">Students Payments</span>
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