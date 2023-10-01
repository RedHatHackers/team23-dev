import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userReducer } from "../reducers/userReducer";
import { setProfile } from "../actions/userActions";
import { setTutor, setTutorByEmail } from "../localstorage/tutor";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  var { email, password } = formData;

  // useEffect

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit =  (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    // Post req

    axios({
      method: "post",
      url: "http://localhost:5000/api/users/login",
      data: userData,
    })
      .then(async (res) => {
        props.setProfile(res.data);
        localStorage.setItem("email", userData.email);
        let usertype = localStorage.getItem("usertype");
        console.log(res.data);

        if (usertype === "T") {
          await setTutorByEmail(userData.email);
          navigate("/mymodules");
        } else if (usertype === "S") {
          navigate("/offered");
        } else if (usertype === "M") {
          navigate("/regUser");
        } else if (usertype === "W") {
          navigate("/wait");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect credentials")});
  };

  return (
    <section
      className="vh-100 gradient-custom-5"
      style={{ backgroundColor: "#c0e0c1" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <form className="text-center mb-5" onSubmit={onSubmit}>
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Sign in</h3>

                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      value={email}
                      className="form-control form-control-lg"
                      onChange={onChange}
                    />
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      value={password}
                      className="form-control form-control-lg"
                      onChange={onChange}
                    />
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                  </div>

                  <div className="form-check d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="remember"
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="remember">
                      {" "}
                      Remember password{" "}
                    </label>
                  </div>
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-success btn-lg btn-block"
                      type="submit"
                      onClick={onSubmit}
                    >
                      Login
                    </button>
                  </div>

                  <div
                    style={{
                      borderTop: "2px solid #fff ",
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  ></div>

                  <br />
                  <p className="text-center text-muted mt-5 mb-0">
                    Dont have an account?{" "}
                    <a href="/register" className="fw-bold text-body">
                      <u>Register here</u>
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setProfile: (data) => {
      dispatch(setProfile(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
