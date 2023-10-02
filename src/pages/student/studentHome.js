import React from "react";

import "./sdashboard.css";

export default function Home() {
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
              <h2>Recent Updates</h2>
              {/* <a href="/#" className="btn">View All</a> */}
            </div>

            <table>
              <thead>
                <tr>
                  <td>Tutor</td>
                  <td>Module</td>
                  <td>Heading</td>
                  <td>Status</td>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>Mr KM Hlako</td>
                  <td>Maths</td>
                  <td>Marks out</td>
                  <td>
                    <span className="status delivered">Delivered</span>
                  </td>
                </tr>

                <tr>
                  <td>Mr MP Mahlangu</td>
                  <td>Infos</td>
                  <td>Assignment Due</td>
                  <td>
                    <span className="status pending">Pending</span>
                  </td>
                </tr>

                <tr>
                  <td>Mr KG Makgota</td>
                  <td>Statistics</td>
                  <td>Revision Tomorrow</td>
                  <td>
                    <span className="status return">Return</span>
                  </td>
                </tr>

                <tr>
                  <td>MW Seleka</td>
                  <td>Geography</td>
                  <td>friendly Announcement</td>
                  <td>
                    <span className="status inProgress">In Progress</span>
                  </td>
                </tr>
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
