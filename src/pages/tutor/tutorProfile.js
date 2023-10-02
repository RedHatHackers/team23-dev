import React from "react";

export default function tutorProfile() {
  return (
    <div className="container1 ">
      <form action="">
        <div className="row">
          <div className="col">
            <div className="cardHeader details">
              <h3>My Profile</h3>
              {/* <a href="/#" className="btn">View All</a> */}
            </div>

            <div className="inputBox">
              <span>Name :</span>
              <input type="text" placeholder="" />
            </div>
            <div className="inputBox">
              <span>email : </span>
              <input type="email" placeholder="" />
            </div>
            <div className="inputBox">
              <span>Surname :</span>
              <input type="text" placeholder="" />
            </div>
            <div className="inputBox">
              <span>Password :</span>
              <input type="password" placeholder="" />
            </div>
          </div>
        </div>
        <input type="submit" value="Update details" className="submit-btn" />
      </form>
    </div>
  );
}
