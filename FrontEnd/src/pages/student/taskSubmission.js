import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getTask } from "../../localstorage/taskSubmission";
export default function UploadTask() {
 
    const task = getTask();
  
    
    var [formData, setFormData] = useState({
      studentId: localStorage.getItem("userId"),
      taskId: task.taskId,
      date: new Date(Date.now()).getDay()+ "-" +
            new Date(Date.now()).getMonth()+"-"+
            new Date(Date.now()).getFullYear()+"  "+
            new Date(Date.now()).getHours()+ " : " + 
            new Date(Date.now()).getMinutes(),
      document: "",
      documentName: "",
      //document
    });
  
    const { date, document, documentName } = formData;
    const [useData, setUserData] = useState([]);
  
    const [submissionData, setSubmissionData] = useState([]);
    const onChangeDoc = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        document: e.target.files[0],
        documentName: e.target.files[0].name,
      }));
      console.log(document);
    };
    const onChange = (e) => {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };
  
    const onSubmit = (e) => {
      e.preventDefault();
  
      if (documentName === "" ) {
        alert("please fill in all the fields");
      } else {
        
        const submissionData = {
          ...formData,
        };
        console.log(submissionData)
        axios({
          method: "post",
          headers: { "content-type": "multipart/form-data" },
  
          url: "http://localhost:5000/api/users/submitTask",
          data: submissionData,
        })
          .then((res) => {
            console.log(res.data);
            alert("success: Submitted successfully");
          })
          .catch((err) => alert(" please try again"));
      }
    };

 
    useEffect(() => {
       

        const getUserdata = async () => {
            axios({
              method: "post",
              url: "http://localhost:5000/api/users/getMySubmission",
              data: {
                studentId: localStorage.getItem("userId"),
                taskId:task.taskId
              },
            }).then((res) => {
                setSubmissionData(res.data);
              console.log(res.data);
            });
          };
          getUserdata();
      }, []);
    

      const { module } = useParams();
      console.log(useParams())

    return (
        <div className="">
            <div className="main  p-5 text-center">
              <br /> <br /> <br />
                <div>
                    <div className="cardHeader">
                        <h2 className=".text-success cardHeader">Submit Your task for {module} </h2>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="name"
                          value={documentName}
                          name="documentName"
                          placeholder="Task Title"
                          className="form-control form-control-sm"
                          onChange={onChange}
                          required
                        />
                      </div>
                    <form>
                        <input 
                        type="file" 
                        id="file" 
                        onChange={onChangeDoc} required 
                        />
                  
                        <input
                            className="btn btn-info"
                            type="submit"
                            text="submit"
                             onClick={onSubmit}
                        />
                    </form>

                    <table class="table min-width">
                        <thead>
                            <tr>


                                <th>Task</th>
                                <th>Date</th>
                                <th>Action</th>
                                <td></td><td></td><td></td><td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {submissionData.map((submission) => (

                                <tr>

                                    
                                    <td> <a href={"data:file/pdf;base64," + submission.document} download={submission.documentName}>{submission.documentName}</a></td>
                                    <td>{submission._date}</td>
                                    
                                    <td>
                                    <div className="d-grid gap-2">
                              <a
                                href={"/deleteSubmission"}
                                className="btn btn-danger btn-md btn-block"
                                onClick={() => {
                                  setSubmissionData(submission);
                                }}
                              >
                                Delete
                              </a>
                            </div>
                                    </td>
                                    <td></td>
                                    <td></td><td></td><td></td>
                                </tr>
                         ))} 


                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}