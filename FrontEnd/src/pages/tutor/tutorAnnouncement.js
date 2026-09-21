import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getModule } from "../../localstorage/module";
import { getTutor } from "../../localstorage/tutor";

export default function TUTAnnouncement() {
    const module = getModule();
    const tutor = getTutor();
    const [formData, setFormData] = useState({
        code: module.Id,
        tutorId: tutor.tutorId,
        heading: "",
        announce: ""
       

    });
    const navigate = useNavigate();



    const { heading, announce } = formData;
    const [useData, setUserData] = useState([]);
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const onSubmit = (e) => {
        e.preventDefault();

        if (heading === "" || announce === "") {
            alert("please fill in all the fields");
        } else {
            const userData = {
                ...formData,
            };
            console.log(formData)
            axios({
                method: "post",
               
                url: "http://localhost:5000/api/tutor/addAnnouncement",
                data: userData,
                
            }).then((res) => {
                alert("success: Announcement issued successfully");

                navigate("/viewAnnouncements");
            }).catch((err) => alert(" please try again"));
    }
};
               
    return (
        <React.Fragment>
            <div className="">
                <div className="main p-5 text-center">
                    <div>
                        <div className="">
                            <div className="cardHeader">
                                <h2>Write Announcement</h2>
                            </div>
                            <div className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="heading"
                                    value={heading}
                                    name="heading"
                                    placeholder="Announcement heading"
                                    className="form-control form-control-md"
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <textArea
                                    type="text"
                                    id="announce"
                                    className="form-control form-control-md"
                                    name="announce"
                                    value={announce}
                                    onChange={onChange}
                                    placeholder="Write Announcement here"
                                />

                            </div>
                            <div className="d-grid gap-2">
                                            <button
                                                className="btn btn-success btn-lg btn-block"
                                                type="submit"
                                                onClick={onSubmit}
                                            >
                                                Send
                                            </button>
                                        </div>


                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

}

{/* <section
className=" vh-100 bg-image"
style={{
    backgroundimage:
        "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
}}
>
<div className="mask d-flex align-items-center h-100 gradient-custom-4">

    <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">

            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                    <div className="card-body p-5">
                        <h2 className="text-uppercase text-center mb-5">
                            Add Announcement
                        </h2>

                        <form className="text-center mb-5" >
                            <div className="form-outline mb-4">
                              
                        
                            </div>
                            <div className="d-flex btn-success justify-content-center">
                                <button
                                    type="button"
                                    // onClick={onSubmit}
                                    className="btn  btn-lg "
                                >
                                    Post Task
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </div>

    </div>
</div>

</section> */}
