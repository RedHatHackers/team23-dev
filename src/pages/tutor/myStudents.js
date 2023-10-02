import React, { useEffect, useState } from "react";

import "./tdashboard.css";
import axios from "axios";
import { getTutor } from "../../localstorage/tutor";
import { getModule } from "../../localstorage/module";

export default function Mystudents() {
  var [myStudentsData, setmyStudentsData] = useState([]);
  var tutor =  getTutor()
 
  useEffect(() => {
   
    const getmyStudents = async () => {
      
        console.log({tutor:tutor})
        const data = {
            tutorId: tutor.tutorId,
        };

        await axios({
            method: "post",
            url: "http://localhost:5000/api/tutor/myStudents",
            data: data,
        })
            .then((res) => {
                setmyStudentsData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.log(err));
    };
    getmyStudents();
  }, []);

  return (
    <div className="">
      <div className="main  p-5 text-center">
        <div>
          <div className="cardHeader">
            <h2 className=".text-success cardHeader">My Students</h2>
          </div>

          <table class="table min-width">
            <thead>
              <tr>
                <th> Name</th>
                <th>Email</th>
                <th>Module</th>
                <th></th>
                <th></th>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {myStudentsData.map((data) => (
                <tr>
                  <td>{data.student.name}</td>
                  <td>{data.student.email}</td>
                  <td>{data.module.name}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
