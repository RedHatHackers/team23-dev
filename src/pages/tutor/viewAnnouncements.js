import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getTutor } from "../../localstorage/tutor";
import { getModule } from "../../localstorage/module";




export default function ViewAnnouncements() {
    const tutor = getTutor();
    const module = getModule();

    const [announcementData, setAnnouncementData] = useState([]);

    useEffect(() => {
        const getAnnouncements = async () => {
            const data = {
                tutorId: tutor.tutorId,
                moduleCode: module.Id,
            };

            axios({
                method: "post",
                url: "http://localhost:5000/api/tutor/getAnnouncements",
                data: data,
            })
                .then((res) => {
                    setAnnouncementData(res.data);
                    console.log(res.data);
                })
                .catch((err) => console.log(err));
        };
        getAnnouncements();
    }, []);


    return (
        <React.Fragment>
            <div>
                <div className="my-main details ">
                    <div className=" main cardHearder">
                        <h2 className="justify-content-centre"> Announcements</h2>
                    </div>
                    {/* <a href="/#" className="btn">View All</a> */}
                    {announcementData.map((announce) => (
                        // <form action="main p-5 text-center">
                            <table className="table justify-text-center table-center">
                                <thead>
                                    <th>{announce.announceHeading}</th>
                                </thead>
                                <tbody>
                                    
                                    <td><p>{announce.announce}</p></td>

                                    
                                </tbody>
                            </table>
                        // </form>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

