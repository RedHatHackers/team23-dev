import React from "react";

import { useEffect, useState } from "react";
import axios from "axios";
import "./manager.css";

import { useParams } from "react-router-dom";

export default function MyTutors() {
  const [userData, setUserdata] = useState([]);

  useEffect(() => {
    const getUserdata = async () => {
      await axios
        .get("http://localhost:5000/api/manager/getTutors")
        .then((res) => {
          setUserdata(res.data);
          console.log(res.data);
        });

      // Tutors in the organization
    };
    getUserdata();
  }, []);

  const { module } = useParams();
  const url = module;
  return (
    <React.Fragment>
      <div className="">
        {/* <!-- ========================= Main ==================== --> */}
        <div className="my-main">
          <div className="topbar">
            {/* <div className="toggle">
                        <ion-icon name="menu-outline"></ion-icon>
                    </div> */}

            <div className=""></div>
          </div>

          <div className="details" style={{ backgroundColor: "#c0e0c1" }}>
            <div className="recentCustomers">
              <div className="cardHeader">
                <h2>Synat Tutors</h2>
              </div>

              <table className="table min-width">
                <thead>
                  <th>Name</th>
                  <th>Email</th>
                </thead>

                <tbody>
                  {userData.map((mytutors) => (
                    <tr>
                      {/* <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer02.jpg" alt="" /></div>
                                </td> */}
                      <td>{mytutors.name}</td>
                      <td>{mytutors.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
