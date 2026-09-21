import React from "react";
import "./register.css";
export default function wait() {
  const logout = () => {
    localStorage.clear();
  };
  return (
    <section>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <h2>Thanks for your application</h2>
            <h4>please wait as your application is being reviewed</h4>
            <p>An email will be sent to for application feedback. LOOK OUT</p>
            <a href="/login" onClick={logout}>
              <button className="btn btn-success btn-lg" >
                Log In
              </button>
            </a>
          </div>
          <div className="col-sm-4">
            <span className="glyphicon glyphicon-signal logo"></span>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-grey">
        <div className="row">
          <div className="col-sm-4">
            <span className="glyphicon glyphicon-globe logo"></span>
          </div>
          <div className="col-sm-8">
            <h2>Our Values</h2>
            <h4>
              <strong>MISSION:</strong> Our mission is to thrive for excellence
            </h4>
            <p>
              <strong>VISION:</strong> Our vision is to empower students
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
