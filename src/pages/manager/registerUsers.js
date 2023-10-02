import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./manager.css";
import PopUp from "../../components/PopUp";
import axios from "axios";

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    surname: "",
    password: "",
    password2: "",
    usertype: "S",
  });
  const navigate = useNavigate();

  const { name, surname, email, password, password2, usertype } = formData;

  const setUserType = (e) => {
    console.log(e.target.id);
    setFormData({ ...formData, usertype: e.target.id });
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert("Passwords do not match");
    } else if (
      name == "" ||
      surname == "" ||
      email == "" ||
      password == "" ||
      password2 == ""
    ) {
      alert("one or two values not inputed");
    } else {
      const userData = {
        ...formData,
      };

      axios({
        method: "post",
        url: "http://localhost:5000/api/users/register",
        data: userData,
      })
        .then((res) => {
          alert("User successfully created");
        })
        .catch((err) => {
          alert("User already exists, Email taken");
        });
    }
  };

  return (
    <section
      className="vh-100 bg-image"
      style={{
        backgroundimage:
          "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-4">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "15px" }}>
                <div className="card-body p-5">
                  <h2 className="text-uppercase text-center mb-5">
                    Register a new user
                  </h2>

                  <form className="text-center mb-5" onSubmit={onSubmit}>
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Name"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        id="surname"
                        className="form-control form-control-lg"
                        name="surname"
                        value={surname}
                        onChange={onChange}
                        placeholder="Surname"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Email"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        className="form-control form-control-lg"
                        name="password"
                        value={password}
                        onChange={onChange}
                        placeholder="Enter Password"
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password2"
                        className="form-control form-control-lg"
                        name="password2"
                        value={password2}
                        onChange={onChange}
                        placeholder="Re-Enter password"
                      />
                    </div>
                    
                      <select id="selectUser" className="form-select form-control form-control-lg" aria-label="Default select example">
                        <option selected>Select Usertype</option>
                        <option value="S">Student</option>
                        <option value="T">Tutor</option>
                        <option value="M">Manager</option>
                      </select>
                      <div></div>
                   
                      <div className="d-grid gap-2">
                    <button
                      className="btn btn-success btn-lg btn-block"
                      type="submit"
                      onClick={onSubmit}
                    >
                       Register User
                    </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
