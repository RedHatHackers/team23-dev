import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getModule } from "../../localstorage/module";
import { getTutor } from "../../localstorage/tutor";
import { setTask } from "../../localstorage/taskSubmission";
import { findModule, setModule } from "../../localstorage/module";

export default function PostTask() {
  const module = getModule();
  const tutor = getTutor();

  var [formData, setFormData] = useState({
    code: module.Id,
    tutorId: tutor.tutorId,
    title: "",
    moduleName: module.name,
    duedate: "",
    taskDocument: "",
    //document
  });

  const taskCount = 0;
  const { title, taskDocument, moduleName, duedate } = formData;
  const [useData, setUserData] = useState([]);

  const [taskData, setTaskData] = useState([]);
  const onChangeDoc = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      taskDocument: e.target.files[0],
      title: e.target.files[0].name,
    }));
    console.log(taskDocument);
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || moduleName === "" || duedate === "") {
      alert("please fill in all the fields");
    } else {
      const taskData = {
        ...formData,
      };
      axios({
        method: "post",
        headers: { "content-type": "multipart/form-data" },

        url: "http://localhost:5000/api/tutor/addTask",
        data: taskData,
      })
        .then((res) => {
          alert("success: Task issued successfully");
        })
        .catch((err) => alert(" please try again"));
    }
  };

  useEffect(() => {
    const getTasks = async () => {
      const data = {
        tutorId: tutor.tutorId,
        moduleCode: module.Id,
      };

      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/getTasks",
        data: data,
      })
        .then((res) => {
          setTaskData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    getTasks();
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
                      Add Assessment
                    </h2>

                    <form
                      encType="multipart/form-data"
                      className="text-center mb-5"
                      onSubmit={onSubmit}
                    >
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="title"
                          value={title}
                          name="title"
                          placeholder="Assessment Title"
                          className="form-control form-control-lg"
                          onChange={onChange}
                          required
                        />
                      </div>
                      <div className="form-outline mb-4">
                        <div className="row">
                          <div className="form-control form-control-lg col-md-4">
                            <>
                              <label>Select Due Date</label>
                              <br />
                              <input
                                type="datetime-local"
                                min={new Date().toString()}
                                id="date"
                                name="duedate"
                                value={duedate}
                                placeholder="Due Date"
                                onChange={onChange}
                                required
                              />
                            </>
                          </div>
                        </div>
                      </div>
                      <input
                        type="file"
                        name="taskDocument"
                        id="formFileMultiple"
                        onChange={onChangeDoc}
                      />
                      <br /> <br />
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-success btn-lg btn-block"
                          type="submit"
                          onClick={onSubmit}
                        >
                          Post Task
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="main details" style={{ backgroundColor: "#fff" }}>
                <div className="">
                  <div className="justify-content-center">
                    <h2>Available Tasks</h2>
                    {/* <a href="/#" className="btn">View All</a> */}
                  </div>
                  <table class="table min-width">
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Due Date</th>
                        <th>Edit</th>
                        <th>Results</th>
                      </tr>
                    </thead>
                    <tbody>
                      {taskData.map((task) => (
                        <tr>
                          <td>
                            <a
                              href={"data:file/pdf;base64," + task.taskDocument}
                              download={task.title}
                            >
                              {task.title}
                            </a>
                          </td>
                          <td>{task.duedate}</td>
                          <td>
                            {/* <!-- Call to action buttons --> */}
                            <ul class="list-inline m-0">
                              <li class="list-inline-item">
                                <a
                                  onClick={() => {
                                    setTask(task);
                                  }}
                                  href="/editTask"
                                  id="getModId"
                                  name="task name"
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
                            <div className="d-grid gap-2">
                              <a
                                href={"/submissions"}
                                className="btn btn-info btn-lg btn-block"
                                onClick={() => {
                                  setTask(task);
                                }}
                              >
                                Submissions
                              </a>
                            </div>
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
