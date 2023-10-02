import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyProfile() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    surname: "",
  });
  const navigate = useNavigate();

  // useEffect
  const { name, surname, email } = formData;

  useEffect(() => {
    console.log(localStorage.getItem("userId"));
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/myprofile",
        data: { Id: localStorage.getItem("userId") },
      }).then((res) => {
        setFormData({...res.data});
        console.log(res.data);
      }).catch((err)=>{
        console.log(err);
      });
    };

    getUserdata();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,surname,
      email,
    };

    axios({
      method: "put",
      url: "http://localhost:5000/api/users/update",
      data: userData,
    })
      .then((res) => {
        if (res.status === 200) alert("Profile updated");
      })
      .catch((err) => {
        alert("err");
        console.log(err);
      });
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
                  <h2 className="text-uppercase text-center mb-5">Update</h2>

                  <form className="text-center mb-5" onSubmit={onSubmit}>
                    <div className="form-outline mb-4">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control form-control-lg"
                        name="name"
                        value={name}
                        onChange={onChange}
                        placeholder="Your Name"
                        required
                      />
                    </div>

                    <div className="form-outline mb-4">
                    <label htmlFor="surname">Surname</label>
                      <input
                        required
                        type="text"
                        id="surname"
                        className="form-control form-control-lg"
                        name="surname"
                        n
                        value={surname}
                        onChange={onChange}
                        placeholder="Surname"
                      />
                    </div>

                    <div className="form-outline mb-4">
                    <label htmlFor="email"> Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-control-lg"
                        name="email"
                        value={email}
                        onChange={onChange}
                        placeholder="Your Email"
                        required
                      />
                    </div>

                    <div className="d-grid gap-2">
                      <button
                        className="btn btn-success btn-lg btn-block"
                        type="submit"
                        onClick={onSubmit}
                      >
                        update
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
