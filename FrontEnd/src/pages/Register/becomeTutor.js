import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";

export default function BecomeTutor() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        surname: "",
        experience: "",
        qualification: "",
        password: "",
        password2: ""
    });
    const navigate = useNavigate();



    const { name, surname, email,qualification,experience, password, password2 } = formData;

    // useEffect

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            toast.error("Passwords do not match");
        } else {
            const userData = {
                name,
                email,
                experience,
                qualification,
                password,
                surname,
            };

            axios({
                method: "post",
                url: "http://localhost:5000/api/tutor/beAtutor",
                data: userData,
            })
                .then((res) => {
                    console.log("success: applied");

                    navigate("/wait");
                })
                .catch((err) => console.error(err));
        }
    };

    return (
        <section
            className="vh-100 bg-image"
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
                                        Apply to be a tutor
                                    </h2>

                                    <form className="text-center mb-5" onSubmit={onSubmit}>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control form-control-lg"
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                                placeholder="Your Name"
                                            />

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="text"
                                                id="surname"
                                                className="form-control form-control-lg"
                                                name="surname"
                                                value={surname}
                                                onChange={onChange}
                                                placeholder="Surname"
                                            />

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control form-control-lg"
                                                name="email"
                                                value={email}
                                                onChange={onChange}
                                                placeholder="Your Email"
                                            />

                                        </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="qualification"
                                                id="qualification"
                                                className="form-control form-control-lg"
                                                name="qualification"
                                                value={qualification}
                                                onChange={onChange}
                                                placeholder="Your Qualification"
                                            />

                                        </div>
                                        <div className="form-outline mb-4">
                                                <textArea
                                                    type="text"
                                                    id="description"
                                                    className="form-control form-control-lg"
                                                    name="experience"
                                                    value={experience}
                                                    onChange={onChange}
                                                    placeholder="Write Your experiences"
                                                />

                                            </div>
                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control form-control-lg"
                                                name="password"
                                                value={password}
                                                onChange={onChange}
                                                placeholder="Password"
                                            />

                                        </div>

                                        <div className="form-outline mb-4">
                                            <input
                                                type="password"
                                                id="password2"
                                                className="form-control form-control-lg"
                                                name="password2"
                                                value={password2}
                                                onChange={onChange}
                                                placeholder="Re-Enter your password"
                                            />

                                        </div>

                                        <div>
                                            <h4>Academic Transcript</h4>
                                            <input type="file" />
                                            <button >Upload</button>
                                        </div>

                                        <div className="d-grid gap-2">
                                            <button
                                                className="btn btn-success btn-lg btn-block"
                                                type="submit"
                                                onClick={onSubmit}
                                            >
                                                Apply
                                            </button>
                                        </div>

                                        <p className="text-center text-muted mt-5 mb-0">
                                            Already have an account?{" "}
                                            <a href="/login" className="fw-bold text-body">
                                                <u>Login here</u>
                                            </a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
