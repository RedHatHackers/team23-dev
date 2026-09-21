import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Whatweoffer() {
  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    const getUserdata = async () => {

      axios({
        method: "post",
        // headers: { "content-type": "multipart/form-data" },
     
         url: "http://localhost:5000/api/users/AvailableModules",
         data: { studentId : localStorage.getItem("userId")},
      }).then((res) => {
        setUserdata(res.data);
      });
     
      
    };
    getUserdata();
  }, []);



  const addModule = (e) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/users/addModule",
      data: {
        userId: localStorage.getItem("userId"),
        moduleId: e.target.id,
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
        <h3 className="mb-5">What we offer at Synat</h3>

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
                    <div className="cardName">R{getmod.price} p/m</div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="laptop-outline"></ion-icon>
                  </div>

                  <button id={getmod.Id} onClick={addModule}>
                    Add module
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
