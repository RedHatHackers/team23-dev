import React from "react";
import "./manager.css";
import { useEffect, useState } from "react";
import axios from "axios";
import ViewApplication from "../manager/viewApplication";

export default function TutorApplications() {

  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    const getUserdata = async () => {

      axios.get("http://localhost:5000/api/manager/getApplications").then((res) => {
        setUserdata(res.data);
        console.log(res.data[0])
        console.log(res)
      });

      // Applications
    };
    getUserdata();
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
                    <h2>Tutoring Applications</h2>
                    {/* <a href="/#" className="btn">View All</a> */}
                  </div>

                  <table >
                    <thead>
                      <tr>
                        <td > Name</td>
                        <td > Surname</td>
                        <td >Email</td>
                        <td >Action</td>
                      </tr>
                    </thead>

                    <tbody>
                      {userData.map((getAppliedTutors) => (
                        <tr href=" " key={getAppliedTutors.Id}>
                          <td>{getAppliedTutors.name}</td>
                          <td>{getAppliedTutors.surname}</td>
                          <td>{getAppliedTutors.email}</td>
                          <a href={"/viewApplication/" + getAppliedTutors.email}><td>View Application</td></a>
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
