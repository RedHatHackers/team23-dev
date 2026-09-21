import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getTutor } from "../../localstorage/tutor";
import { getModule } from "../../localstorage/module";

export default function JoinClass() {
  const module = getModule();
  const tutor = getTutor();
  var [formData, setFormData] = useState({
    moduleCode: module.Id,
    tutorId: tutor.tutorId,
    sessionName: "",
    classDate: "",
    classLink: "",
  });
  const { sessionName, classDate, classLink } = formData;
  const [classData, setClassData] = useState([]);

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
          // console.log(res.data);
        })
        .catch((err) => console.log(err));
        console.log(data+ "tutor and module data");

    };

    getClass();
  }, []);

  return (
    <div className="">
      <div className="main p-5 text-center">
        <div>
          <div className="">
            <div className="cardHeader">
              <h2>Attend Your {module.name} classes</h2>
            </div>
            <br />
            <br />
            <br />

            <table class="table min-width">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Session</th>
                  <th>Date and Time</th>
                  <th>Link To Class</th>
                </tr>
              </thead>
              <tbody>
                {classData.map((joinclass) => (
                  <tr>
                    <th>1</th>
                    <td>{joinclass.sessionName}</td>

                    <td>{joinclass.classDate}</td>
                    <td>
                      <a
                        href={joinclass.classLink}
                        type="button"
                        className="me-5  btn btn-primary pull-left"
                        onclick="check()"
                      >
                        Join Class
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
  );
}
