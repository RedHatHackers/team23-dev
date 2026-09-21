import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getModule } from "../../localstorage/module";
import { getTutor } from "../../localstorage/tutor";
import { getTask, setTask } from "../../localstorage/taskSubmission";
import { findModule, setModule } from "../../localstorage/module";

export default function EditTask() {
  const [taskData, setTaskData] = useState({ ...getTask() });

  const { title, total,taskDocument, moduleName, duedate } = taskData;

  const onChangeDoc = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      taskDocument: e.target.files[0],
      title: e.target.files[0].name,
    }));
    console.log(taskDocument);
  };

  const onChange = (e) => {
    setTaskData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    //     e.preventDefault();
    //     if (title === "" || moduleName === "" || duedate === "") {
    //       alert("please fill in all the fields");
    //     } else {
    //       axios({
    //         method: "post",
    //         headers: { "content-type": "multipart/form-data" },
    //         url: "http://localhost:5000/api/tutor/editTask",
    //         data: taskData,
    //       })
    //         .then((res) => {
    //           alert("success: Task issued successfully");
    //         })
    //         .catch((err) => alert(" please try again"));
    //     }
  };

  // update task info
  useEffect(() => {
    console.log(taskData);
    const getTask = async () => {
      const tData = {
        taskId: taskData.Id,
      };

      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/getTaskById",
        data: tData,
      })
        .then((res) => {
          setTaskData(res.data);
          setTask(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    getTask();
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
                      Edit Assessment
                    </h2>

                    <form
                      encType="multipart/form-data"
                      className="text-center mb-5"
                      onSubmit={onSubmit}
                    >
                      <div style={{ borderStyle: "groove;" }}>
                        <h5>
                          <a
                            href={"data:file/pdf;base64," + taskDocument}
                            download={title}
                          >
                            current file
                          </a>
                          <br />
                          <br />
                          Due date: {duedate}
                        </h5>
                      </div>
                      <br />
                      <br />
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
                      </div>{" "}
                      <div className="form-outline mb-4">
                        <input
                          type="number"
                          id="total"
                          value={total}
                          name="total"
                          placeholder="Assessment total"
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
                      <br /> <br />
                      <div className="d-grid gap-2">
                        <button
                          className="btn btn-success btn-lg btn-block"
                          type="submit"
                          onClick={onSubmit}
                        >
                          eidt Task
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
