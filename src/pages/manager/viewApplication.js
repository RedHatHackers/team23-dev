import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ViewApplication() {
    const { tutorEmail } = useParams();

    const [tutorData, setTutorData] = useState({
        name: "",
        surname: "",
        qualification: "",
        experience: "",
        academicRecord: null,
        email: "",

    });
    useEffect(() => {
        const getTutorData = async () => {
            axios({
                method: "post",
                url: "http://localhost:5000/api/manager/getTutor",
                data: {
                    email: tutorEmail
                }
            }).then((res) => {
                setTutorData({ ...res.data });
                console.log(tutorEmail)

                console.log(tutorData);

            }).catch((err) => {
                console.log(err);
            });
        };
        getTutorData();
    }, []);


    const onAccept = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:5000/api/manager/acceptTutor",
            data: tutorData,

        }).then((res) => {
            alert("success: Accepted");


        })
            .catch((err) => console.error(err));
    }
    const onReject = (e) => {
        e.preventDefault();
        axios({
            method: "post",
            url: "http://localhost:5000/api/manager/rejectTutor",
            data: tutorData,

        }).then((res) => {
            alert("success: Rejected");
        })
            .catch((err) => console.error(err));
    }
    return (
        <React.Fragment>
        <div className="">
            <div className="main p-5 text-center">
                <div>
                    <div className="">

                        <div className="cardHeader">
                            <h2>View Application</h2>
                            <p className="text-left"><b>Name:</b> {tutorData.name} </p>
                            <p className="text-left"><b>Surname:</b> {tutorData.surname}</p>
                            <p className="text-left"><b>Qualifications:</b> {tutorData.qualification}</p>
                            <p className="text-right"><b>Academic Record:</b> {tutorData.academicRecord} </p>
                            <p className="text-sm-left"><b>Email:</b> {tutorData.email}</p>
                            <p className="text-sm-left"><b>Experience:</b> {tutorData.experience}</p>
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-lg btn-success btn-lg btn-block"
                                type="submit"
                                onClick={onAccept}
                            >
                                Accept
                            </button>
                        </div>
                        <br />
                        <div className="d-grid gap-2">
                            <button
                                className="btn btn-danger btn-lg btn-block"
                                type="submit"
                                onClick={onReject}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
    
}


