import React, { useEffect, useState } from "react";

import "./sdashboard.css";
import axios from "axios";
import { NavLink, useHref } from "react-router-dom";
import { setAnnouncement } from "../../localstorage/announcement";

export default function Home() {
  const [announcementData, setAnnouncementData] = useState([]);
  const [moduleData, setModuleDataData] = useState([]);
  const [tutorData, setTutorDataData] = useState([]);
  useEffect(() => {
    const fetchAnnouncements = () => {
      axios({
        method: "post",
        // headers: { "content-type": "multipart/form-data" },

        url: "http://localhost:5000/api/users/myAnnouncement",
        data: { studentId: localStorage.getItem("userId") },
      })
        .then((res) => {
          setAnnouncementData(res.data);
        })
        .catch((err) => alert(" please try again"));
    };
    fetchAnnouncements();
  }, []);
  console.log({ kay: announcementData[0] });
  return (
    <div className="">
      {/* <!-- ========================= Main ==================== --> */}
      <div className="my-main">
        <div className="topbar">
          {/* <div className="toggle">
                        <ion-icon name="menu-outline"></ion-icon>
                    </div> */}

          <div className=""></div>
        </div>

        {/* <!-- ================ Order Details List ================= --> */}
        <div className="details" style={{ backgroundColor: "#c0e0c1" }}>
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Announcements</h2>
              {/* <a href="/#" className="btn">View All</a> */}
            </div>

            <table>
              <thead>
                <tr>
                  <td>Tutor</td>
                  <td>Module</td>
                  <td>Heading</td>
                </tr>
              </thead>

              <tbody>
                {announcementData.map((announcement) => (
                  <tr>
                    <td>{announcement.tutor}</td>
                    <td>{announcement.module}</td>
                    <td>
                      <a onClick={()=>{setAnnouncement(announcement)}} href="/announcementDetails">{announcement.announceHeading}</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <!-- ================= New Customers ================ --> */}
          {/* <div className="recentCustomers">
                        <div className="cardHeader">
                            <h2>Recent Customers</h2>
                        </div>

                        <table>
                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>David <div> <span>Italy</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer01.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Amit <div> <span>India</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>David <div> <span>Italy</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer01.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Amit <div> <span>India</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>David <div> <span>Italy</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer01.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Amit <div> <span>India</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer01.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>David <div> <span>Italy</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="public/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Amit <div> <span>India</span></div></h4>
                                </td>
                            </tr>
                        </table>
                    </div> */}
        </div>
      </div>
    </div>
  );
}
