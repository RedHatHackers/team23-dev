import React from 'react'
import "./tdashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { setModules } from "../../localstorage/module";
import { getTutor } from "../../localstorage/tutor";

export default function TutMod() {
    const [userData, setUserdata] = useState([]);
    const [allocatedData, setaData] = useState([]);
    const [unAllocData, setUnAllocData] = useState([]);
    const tutor = getTutor();
    useEffect(() => {
        const getUserdata = async () => {
            const data = {
                tutorId: tutor.tutorId,
            };
            axios({
                method: "post",
                url: "http://localhost:5000/api/tutor/myModules",
                data: data
            })
                .then((res) => {
                    setModules(res.data)
                    setUserdata(res.data)
                })
                .catch((err) => alert(err));
        };
        getUserdata();
        const allocatedModules = async () => {
            const adata = { tutorId: tutor.tutorId }
            axios({
                method: "post",
                url: "http://localhost:5000/api/tutor/allocatedModules",
                data: adata,

            })
                .then((res) => {
                    setaData(res.data)
                    console.log(res.data)
                })
                .catch((err) => console.log(err));
            // console.log(res.data);  
        };
        allocatedModules();
        const unallocatedModules = async () => {
            const unAData = { tutorId: tutor.tutorId }
            axios({
                method: "post",
                url: "http://localhost:5000/api/tutor/unallocatedModules",
                data: unAData,

            })
                .then((res) => {
                    setUnAllocData(res.data)
                    console.log(res.data)
                })

                .catch((err) => console.log(err));
            // console.log(res.data);  
        };
        unallocatedModules();
    }, []);
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
                            <h2>My Modules</h2>
                            {/* <a href="/#" className="btn">View All</a> */}
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <td>Module</td>
                                    <td>Status</td>
                                </tr>
                            </thead>

                            <tbody>
                                {unAllocData.map((getmod) => (
                                    <a href={'/mymodules/' + getmod.code}>
                                        <tr>
                                            <td>{getmod.name}</td>
                                            <td>
                                                {(getmod.allocated === 1 ?
                                                    <td>
                                                        <span className="status success">Allocated</span>
                                                    </td>
                                                    : <td >
                                                        <span className="status danger">UnAllocated</span>
                                                    </td>
                                                )}
                                            </td>
                                        </tr>
                                    </a>
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
    )
}
