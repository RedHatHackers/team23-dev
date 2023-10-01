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
      <div className="main container myfooter ">
        {/* <!-- Footer --> */}
        <footer
          className="container h-100 mask d-flex align-items-end h-100 "
        //style="background-color: #ECEFF1"

        >
          {/* <!-- Section: Social media --> */}
          <section
            className="d-flex justify-content-center p-4 text-white"
          //style="background-color: #21D192"
          >
            {/* <!-- Left --> */}

            {/* <!-- Left -->

      <!-- Right --> */}
            <div className="text-white me-4">


            </div>
            {/* <!-- Right --> */}
          </section>
          {/* <!-- Section: Social media -->

    <!-- Section: Links  --> */}
          <section className="container-fluid">
            <div className=" text-center text-md-start mt-5">
              {/* <!-- Grid row --> */}
              <div className="row mt-3">
                {/* <!-- Grid column --> */}
                <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  {/* <!-- Content --> */}
                  <div className="mb-4 mt-0 d-inline-block mx-auto">
                    {/* <span>Get connected with us on social networks:</span> */}
                  </div>
                  {/* <h6 className="text-uppercase fw-bold">Company name</h6>
            <hr
                className="mb-4 mt-0 d-inline-block mx-auto"
                //style="width: 60px; background-color: #7c4dff; height: 2px"
                />
            <p>
              Here you can use rows and columns to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p> */}
                </div>
                {/* <!-- Grid column -->

          <!-- Grid column --> */}
                <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* <!-- Links --> */}
                  <h6 className="text-uppercase fw-bold">Products</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                  //style="width: 60px; background-color: #7c4dff; height: 2px"
                  />
                  <p>
                    <a href="#!" className="text-dark">MDBootstrap</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">MDWordPress</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">BrandFlow</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Bootstrap Angular</a>
                  </p>
                </div>
                {/* <!-- Grid column -->

          <!-- Grid column --> */}
                <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                  {/* <!-- Links --> */}
                  <h6 className="text-uppercase fw-bold">Useful links</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                  // style={"width: 60px; background-color: #7c4dff; height: 2px"}
                  />
                  <p>
                    <a href="#!" className="text-dark">Your Account</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Become an Affiliate</a>
                  </p>
                  <p>
                    <a href="#!" className="text-dark">Shipping Rates</a>
                  </p>
                  <p>
                    <a href="/#!" className="text-dark">Help</a>
                  </p>
                </div>
                {/* <!-- Grid column -->

          <!-- Grid column --> */}
                <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  {/* <!-- Links --> */}
                  <h6 className="text-uppercase fw-bold">Contact</h6>
                  <hr
                    className="mb-4 mt-0 d-inline-block mx-auto"
                  //style="width: 60px; background-color: #7c4dff; height: 2px"
                  />
                  <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                  <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
                  <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                  <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
                </div>
                {/* <!-- Grid column --> */}
              </div>
              {/* <!-- Grid row --> */}
            </div>
            <div
              className="text-center p-3"
            //style="background-color: rgba(0, 0, 0, 0.2)"
            >
              © 2020 Copyright:
              <a className="text-dark color:green" href="https://mdbootstrap.com/"
              >MDBootstrap.com</a
              >
            </div>
          </section>
          {/* <!-- Section: Links  -->

    <!-- Copyright --> */}

          {/* <!-- Copyright --> */}
        </footer>

        {/* <!-- Footer --> */}
      </div>
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