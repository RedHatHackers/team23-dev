import React from 'react'
import { getModule } from "../../localstorage/module";
import { getTutor } from "../../localstorage/tutor";
import { useState, useEffect } from "react";

import axios from "axios";




export default function IssueClass() {

  const module = getModule();
  const tutor = getTutor();
  var [formData, setFormData] = useState({
    moduleCode: module.Id,
    tutorId: tutor.tutorId,
    sessionName: "",
    classDate: "",
    classLink: ""
  });
  const { sessionName, classDate, classLink} = formData;

  const [classData, setClassData] = useState([]);

  const onChange = (e) => {
    e.preventDefault();
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (sessionName === "" || classDate === "" || classLink === "") {
      alert("please fill in all the fields");
    } else {
      const classData = {
        ...formData,
      };
      console.log(classData);
      axios({
        method: "post",

        url: "http://localhost:5000/api/tutor/shareLink",
        data: classData,
      })
        .then((res) => {
          console.log(res.data);
           alert("success: Link issued successfully");
        })
        .catch((err) => alert(" please try again"));
    }
  };

  useEffect(() => {
    const getClass = async () => {
      const data = {
        tutorId: tutor.tutorId,
        moduleCode: module.Id,
      };

      axios({
        method: "post",
        url: "http://localhost:5000/api/users/getLink",
        data: data,
      })
        .then((res) => {
          setClassData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    getClass();
  }, []);

  return (
    <React.Fragment>
      <section
        className=" vh-100 bg-image"
        style={{
          backgroundimage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2 className="text-uppercase text-center mb-5">
                      Share Class Link
                    </h2>

                    <form
                      encType="multipart/form-data"
                      className="text-center mb-5"
                      onSubmit={onSubmit}
                    >
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="session"
                          value={sessionName}
                          name='sessionName'
                          placeholder="Session Name"
                          className="form-control form-control-lg"
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <div className="row">
                          <div className="form-control form-control-lg col-md-4">
                            <>
                              <label>Select Class Date</label>
                              <br />
                              <input
                                type="datetime-local"
                                min={new Date().toString()}
                                id="classDate"
                                name="classDate"
                                 value={classDate}
                                placeholder="Class Date"
                                onChange={onChange}
                                required
                              />
                            </>
                          </div>
                        </div>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="classLink"
                           value={classLink}
                          name="classLink"
                          placeholder="Paste link to class here"
                          className="form-control form-control-lg"
                          onChange={onChange}
                          required
                        />
                      </div>
                      <br /> <br />
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-success btn-lg btn-block"
                          type="submit"
                          onClick={onSubmit}
                        >
                          Share Link
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <br/><br/>
              <div className="main details" style={{ backgroundColor: "#fff" }}>
                <div className="">
                  <div className="justify-content-center">
                    <h2>Available Classes</h2>
                    {/* <a href="/#" className="btn">View All</a> */}
                  </div>
                  <table class="table min-width">
                    <thead>
                      <tr>
                        <th>Session Name</th>
                        <th> Date & Time</th>
                        <th>Edit</th>
                        <th>Link</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {classData.map((myclass) => (
                        <tr>
                          <td>{myclass.sessionName}</td>
                          <td>{myclass.classDate}</td>
                          <td>
                            {/* <!-- Call to action buttons --> */}
                            <ul class="list-inline m-0">
                              <li class="list-inline-item">
                                <a
                                  // onClick={() => {
                                  //   setTask(task);
                                  // }}
                                  href="/editLink"
                                  id="sessionName"
                                  name="sessionName"
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
                          <td>
                                <a type="button"
                                      href ={myclass.classLink }
                                       className="me-5  btn btn-primary pull-left" 
                                       onclick="check()"
                                >Host Class
                                </a>
                          </td>
                        </tr>
                      ))}
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
