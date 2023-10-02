import React from 'react'

export default function myTutors() {
    return (
        <div className="">



            <div className="my-main">
                <div className="details" style={{ backgroundColor: "#c0e0c1" }}>
                    <div className="recentCustomers">
                        <div className="cardHeader">
                            <h2>My Tutors</h2>
                        </div>

                        <table>
                          
                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="/public/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Marvin  <div> <span>Limpopo</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="/public/imgs/customer01.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Kabelo <div> <span>Gauteng</span></div></h4>
                                </td>
                            </tr>

                            <tr>
                                <td width="60px">
                                    <div className="imgBx"><img src="/public/imgs/customer02.jpg" alt="" /></div>
                                </td>
                                <td>
                                    <h4>Mthokozisi <div> <span>Mpumalanga</span></div></h4>
                                </td>
                            </tr>

                            
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
