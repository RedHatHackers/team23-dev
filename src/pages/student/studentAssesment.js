import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./sdashboard.css";
import { getTutor } from "../../localstorage/tutor";
import { getModule } from "../../localstorage/module";
import { setTask } from "../../localstorage/taskSubmission";

export default function Assessment() {
  const [taskData, setTaskData] = useState([]);
  const tutor = getTutor();
  const module = getModule();
  useEffect(() => {
    const getTaskData = async () => {
      const data = {
        moduleCode: module.Id,
        tutorId: tutor.tutorId,
        taskDocument: ""
      };
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/getTasks",
        data: data,
      }).then((res) => {
        setTaskData(res.data);
      });
    };
    getTaskData();
  }, []);

  const url = useParams().module;

  console.log(taskData);

  return (
    <div className="main details" style={{ backgroundColor: "#fff" }}>
      <div className="">
        <div className=" cardHeader justify-content-center">
          <h2>{module.name} : Assignment & Tests</h2> <br /> <br /> <br />
          {/* <a href="/#" className="btn">View All</a> */}
        </div>
        <br />
        <table className="table min-width">
          <thead>
            <tr>
              <th>Task </th>
              <th>Module Name</th>
              <th>Tutor Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((task) => (
              <tr>
                <td> <a href={"data:file/pdf;base64," + task.title} download={task.title}>{task.title}</a></td>

                <td>{module.name}</td>
                <td>{tutor.name}</td>
                <td>
                  <div className="d-grid gap-2">
                    <a
                      href={"/tasksubmissions"}
                      className="btn btn-info btn-lg btn-block"
                      onClick={() => {
                        setTask(task);
                      }}
                    >
                      Submit
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
