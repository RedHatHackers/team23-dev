import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { deleteMod, editMod } from "../../components/Manager/editModule";
import "./manager.css";
import axios from "axios";

export default function AddModules() {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    price: "",
  });
  const navigate = useNavigate();

  const { name, code, description, price } = formData;
  var { module } = useParams();
  const [userData, setUserdata] = useState([]);

  const onDelete = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: "http://localhost:5000/api/manager/deleteModule",
      data: { code: code },
    })
      .then((res) => {
      //  navigate("/updateModules");
      })
      .catch((err) => {
        alert("Module Code already exists");
        console.log(err);
      });
  };
  const onEdit = (e) => {
    e.preventDefault();

    if (name === "" || code === "" || description === "" || price === "") {
      alert("one or two values not inputted");
    } else {
      const userData = {
        ...formData,
      };
      console.log(userData)
      axios({
        method: "post",
        url: "http://localhost:5000/api/manager/updateModule",
        data: userData,
      })
        .then((res) => {
          alert("success: Module edited");
        })
        .catch((err) => {
          alert("Module Code already exists");
          console.log(err);
        });
    }
  };

  useEffect(() => {
    const getModuledata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/module",
        data: { code: module },
      })
        .then((res) => {
          console.log(res.data[0].code);
          setFormData({
            ...res.data[0],
          });
        })
        .catch((err) => alert(err));
    };
    getModuledata();
  }, []);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <React.Fragment>
      <section
        className=" vh-100 bg-image"
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
                      Edit Module
                    </h2>

                    <form className="text-center mb-5" onSubmit={onEdit}>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="name"
                          className="form-control form-control-lg"
                          name="name"
                          value={name}
                          onChange={onChange}
                          placeholder="Module Name"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="code"
                          className="form-control form-control-lg"
                          name="code"
                          value={code}
                          onChange={onChange}
                          placeholder="Module Code"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          id="price"
                          className="form-control form-control-lg"
                          name="price"
                          value={price}
                          onChange={onChange}
                          placeholder="Module Price"
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <textArea
                          type="text"
                          id="description"
                          className="form-control form-control-lg"
                          name="description"
                          value={description}
                          onChange={onChange}
                          placeholder="Module description"
                        >{description}</textArea>
                      </div>

                      <div className="d-grid gap-2">
                      <button
                        className="btn btn-success btn-lg btn-block"
                        type="submit"
                        onClick={onEdit}
                      >
                        Edit Module
                      </button>
                    </div>
                      <br />
                      <div className="d-grid gap-2">
                    <button
                      className="btn btn-danger btn-lg btn-block"
                      type="submit"
                      onClick={onDelete}
                    >
                      Delete
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
    </React.Fragment>
  );
}
