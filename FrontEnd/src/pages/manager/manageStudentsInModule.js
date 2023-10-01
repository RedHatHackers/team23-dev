import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function StudentInModule() {
  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/users",
        data: {
          userId: localStorage.getItem("userId"),
        },
      })
        .then((res) => setUserdata(res.data))
        .catch((err) => alert(err));
    };
    getUserdata();
  }, []);


  return (
    <React.Fragment>
      <div
        className="main class p-5 text-center "
        style={{ paddingLeft: "30" }}
      >
        <h3 className="mb-5">Students Doing: name of module</h3>
        <input
                                                    className="btn btn-info"
                                                    type="submit"
                                                    value ="Add Student"
                                                    // onClick={onSubmit}
                                                />
        <div className=" d-grid gap-2  ">
          <div className="cardHeader">
            <div className="cardBox">
              {userData.map((getuser) => (
                <a href={'/users/'+getuser.name}>
                  <div className="card">
                    <div>
                      <div className="cardName">{getuser.name}</div>
                    </div>

                    <div className="iconBx">
                      <ion-icon name="laptop-outline"></ion-icon>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
