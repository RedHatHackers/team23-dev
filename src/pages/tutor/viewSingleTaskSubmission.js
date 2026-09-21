import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getStudent, getTask } from "../../localstorage/taskSubmission";

export default function ViewSingleTaskSubmission() {
  const task = getTask();
  const student = getStudent();
  const [markingData, setMarkingData] = useState({
    file: null,
    feedback: "",
    mark: "",
  });
  
  const onChangeDoc = (e) => {
    e.preventDefault();
    setMarkingData((prevState) => ({
      ...prevState,
      file: e.targetfiles[0],
    }));
    console.log(markingData);
  };
  const [submissionData, setSubmissionData] = useState([]);
  var { mark, feedback, file } = markingData;
  const onSubmitMarks = (e) => {
    e.preventDefault();
    //submissionData.map((student) => {
    const sData = {
      mark: markingData.mark,
      markedDoc: markingData.file,
      taskId: task.taskId,
      studentId: student.Id,
      feedback: markingData.feedback,
    };
    console.log(sData);
    axios({
      method: "post",
      //  headers: { "content-type": "multipart/form-data" },

      url: "http://localhost:5000/api/tutor/addMarks",
      data: sData,
    })
      .then((res) => {
        alert("success: Marks updated successfully");
      })
      .catch((err) => alert(" please try again"));
    // });
  };
  const onChange = (e) => {
    setMarkingData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/getTaskSubmission",
        data: {
          taskId: task.taskId,
          studentId: student.Id,
        },
      }).then((res) => {
        setSubmissionData(res.data);
        setMarkingData(res.data)
        console.log(res.data);
      });
    };

    getUserdata();
      
  }, []);

  
  return (
    <div className="main details container1">
      <form action="">
        <div className="row">
          <div className="col">
            <div className="cardHearder justify-content-center">
              <h2></h2>
              {/* <a href="/#" className="btn">View All</a> */}
            </div>
            <table className="table table-responsive-lg table-hover table-bordered boarder-primary table-striped">
              <thead>
                <tbody>
                  <tr>
                    <th>Student Name : </th>
                    <td> {student.name} </td>
                  </tr>
                  <tr>
                    <th> Email : </th>
                    <td> {student.email}</td>
                  </tr>
                  <tr>
                    <th> Date submitted : </th>
                    <td> {submissionData._date}</td>
                  </tr>
                  <tr>
                    <th>submission : </th>
                    {/* <td type="file"> {doc}</td> */}
                    <td>
                      <a
                        href={"data:file/pdf;base64," + submissionData.document}
                        download={submissionData.documentName}
                      >
                        {submissionData.documentName}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </thead>
            </table>

            <div class="form-group">
              <label class="col-sm-2 control-label">Result</label>
              <div class="col-sm-10">
                <input
                  type="number"
                  className="form-control"
                  id="mark"
                  name="mark"
                  value={mark}
                  onChange={onChange}
                  placeholder="Enter Marks"
                />
              </div>
            </div>
            <br />
            <span>Upload Marked Document</span>
            <br />
            <input
              type="file"
              name="markDocument"
              id="formFileMultiple"
              onChange={onChangeDoc}
              // onChange={onChangeDoc}
            />
            <br />
            <br />

            <div className="form-outline mb-4">
              <textArea
                type="text"
                id="feedback"
                className="form-control form-control-lg"
                name="feedback"
                value={feedback}
                onChange={onChange}
                placeholder={(submissionData.feedback?submissionData.feedback:"Write your feedback here")}
              />
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-success btn-lg btn-block"
                type="submit"
                onClick={onSubmitMarks}
              >
                Submit Marking
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
