import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getTask, setStudent } from "../../localstorage/taskSubmission";

export default function ViewTaskSubmissions() {
  const task = getTask();

  const [submissionData, setSubmissionData] = useState([]);
  const onUpdateMarks = (e) => {
    e.preventDefault();

    submissionData.map((student) => {
      const sData = {
        mark: student.mark,
        taskId: task.taskId,
        studentId: student.studentId,
      };
      axios({
        method: "post",
        headers: { "content-type": "multipart/form-data" },

        url: "http://localhost:5000/api/tutor/addMarks",
        data: sData,
      })
        .then((res) => {
          alert("success: Marks updated successfully");
        })
        .catch((err) => alert(" please try again"));
    });
  };
  useEffect(() => {
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/getTaskSubmissions",
        data: {
          taskId: task.taskId,
        },
      }).then((res) => {
        setSubmissionData(res.data);
        console.log({ res: res.data });
      });
    };
    getUserdata();
  }, []);

  return (
    <div className="main details" style={{ backgroundColor: "#fff" }}>
      <div className="">
        <div className=" cardHeader justify-content-center">
          <h2>Submissions </h2> <br /> <br /> <br />
          {/* <a href="/#" className="btn">View All</a> */}
        </div>
        <br />
        <div className=" table-responsive-sm">
          <table className="table table-hover table-bordered boarder-primary table-striped">
            <thead className="align-items-center">
              <tr>
                <th>&nbsp;</th>
                <th scope="col">Student Name</th>
                <th scope="col">Document</th>

                <th scope="col">Date Submitted</th>
                <th scope="col">Mark</th>
                <th scope="col">view</th>
              </tr>
            </thead>
            <tbody className="col-sm">
              {submissionData.map((submission) => (
                <tr>
                  <th>&nbsp;</th>

                  <td>{submission.student.name}</td>
                  <td>
                    {" "}
                    <a
                      href={"data:file/pdf;base64," + submission.documentName}
                      download={submission.documentName}
                    >
                      {submission.documentName}
                    </a>
                  </td>
                  <td>{submission._date}</td>
                  <td>{submission.mark}/{task.total}</td>
                  <td>
                    <a
                      href="/viewsinglesubmission"
                      onClick={()=>{
                        setStudent(submission.student)
                      }}
                    >
                      View Submission
                    </a>
                  </td>
                  {/* <td><input className="form-control" type="number" placeholder="enter mark" width={20}></input></td>                                */}
                  {/* <td><a href={"data:file/pdf;base64," + paid.pop} download={"proof of payment.pdf"}>proof</a>
                                </td> */}
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="d-grid gap-2">
                        <a
                            href={"/submissions"}
                            className="btn btn-success btn-lg btn-block"
                            onClick = {onUpdateMarks}
                        >
                            Update Marks
                        </a>
                    </div> */}
        </div>
      </div>
    </div>
  );
}
