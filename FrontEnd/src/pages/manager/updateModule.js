import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
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
  const [userData, setUserdata] = useState([]);

  // useEffect

  useEffect(() => {
    formData.getModule = async () => {
      const req = await fetch("http://localhost:5000/api/modules");
      const res = await req.json();
      setFormData(res);
      console.log(res);
    };
    formData.getModule();

    const getUserdata = async () => {
      axios.get("http://localhost:5000/api/module").then((res) => {
        setUserdata(res.data);
      });

      // module already added
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

    if (name === "" || code === "" || description === "" || price === "") {
      alert("one or two values not inputted");
    } else {
      const userData = {
        ...formData,
      };
      axios({
        method: "post",
        url: "http://localhost:5000/api/manager/addmodule",
        data: userData,
      })
        .then((res) => {
          alert("success: Module added");

          navigate("/addmodule");
        })
        .catch((err) => alert("Module Code already exists"));
    }
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
              <div
                className="main details"
                style={{ backgroundColor: "#c0e0c1" }}
              >
                <div className="recentOrders">
                  <div className="cardHeader">
                    <h1></h1>
                    <h2>Update Modules</h2>
                    {/* <a href="/#" className="btn">View All</a> */}
                  </div>

                  <table>
                    <thead>
                      <tr>
                        <td> Name</td>
                        <td> Code</td>
                        <td>Price</td>
                        <td>Action</td>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((getMod) => (
                        <tr href="">
                          <td>{getMod.name}</td>
                          <td>{getMod.code}</td>
                          <td>R {getMod.price}</td>
                          <td>
                            {/* <!-- Call to action buttons --> */}
                            <ul class="list-inline m-0">
                              <li class="list-inline-item">
                                <a
                                  href={"/updateModules/" + getMod.code}
                                  class="btn btn-success btn-sm rounded-0"
                                  type="button"
                                  data-toggle="tooltip"
                                  data-placement="top"
                                  title="Edit"
                                >
                                  <i class="fa fa-edit"></i>
                                </a>
                              </li>
                              
                            </ul>
                          </td>
                        </tr>
                      ))}{" "}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
