import React, { useEffect, useState } from "react";
import axios from "axios";
import { getTutor } from "../../localstorage/tutor";
export default function WhatToTutor() {
  const [userData, setUserdata] = useState([]);
  const tutor = getTutor()
  useEffect(() => {
    const getUserdata = async () => {
      setUserdata([]);
      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/modulesToTutor",
        data: {
          tutorId: tutor.Id,
        },
      }).then((res) => {
        setUserdata(res.data);
      });

      // module already added
    };
    getUserdata();
  }, []);



  const addModule = (e) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/tutor/addModule",
      data: {
        tutorId: tutor.Id,
        moduleCode: e.target.id,
      },
    })
      .then((res) => {
        alert("module added");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <React.Fragment>
      <div
        className="main class p-5 text-center "
        style={{ paddingLeft: "30" }}
      >
        <h3 className="mb-5">Modules You can Tutor</h3>

        <div className=" d-grid gap-2  ">
          <div className="cardHeader">
            <div className="cardBox">
              {userData.map((getmod) => (
                <div className="card" >
                  <div>
                    {/* <div className="numbers">80</div> */}
                    <div className="cardName">{getmod.name}</div>
                    <div className="cardName">{getmod.description}</div>
                    <div className="cardName">{getmod.code}</div>

                  </div>

                  <div className="iconBx">
                    <ion-icon name="laptop-outline"></ion-icon>
                  </div>

                  <button id={getmod.Id} onClick={addModule}>
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
