import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { setModulePop } from "../../localstorage/pop";
import { setTutor } from "../../localstorage/tutor";
import { setModule } from "../../localstorage/module";

export default function Module() {



  const [userData, setUserdata] = useState([]);
  const [paidData, setpData] = useState([]);
  const [unpaidData, setupData] = useState([]);
  useEffect(() => {
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/myModules",
        data: {
          userId: localStorage.getItem("userId"),
        },
      })
        .then((res) => setUserdata(res.data))
        .catch((err) => alert(err));
    };
    getUserdata();
    const paidModules = async () => {
      const pdata = { userId: localStorage.getItem("userId") }
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/paidModules",
        data: pdata,
  
      })
      .then((res) =>{ setpData(res.data)
      console.log(res.data)})
      .catch((err) => console.log(err));
       // console.log(res.data);  
    };
    paidModules();
    const unpaidModules = async () => {
      const upData = { userId: localStorage.getItem("userId") }
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/unpaidModules",
        data: upData,
  
      })
      .then((res) => {setupData(res.data)
        console.log(res.data)})

      .catch((err) => console.log(err));
       // console.log(res.data);  
    };
    unpaidModules();
  }, []);


return (
  <React.Fragment>
        <div
      className="main class p-5 text-center center-block"
      style={{ paddingLeft: "30" }}
    >
      <div className="cardHeader">
      <h2 className="mb-5">My Modules</h2>
      </div>
      <div className=" d-grid gap-2  ">
        <div className="cardHeader">
          <div className="cardBox">
            {paidData.map((getmod) => (
              <a href={'/classes/' + getmod.name} onClick={()=>{
                setModule(getmod);
              }}>
                <div className="card">
                  <div>
                    <div className="cardName">{getmod.name}</div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="laptop-outline"></ion-icon>
                  </div>


                </div>
              </a>
            ))}
              {unpaidData.map((getmod) => (
              <a href="/uploadpop/" onClick={() => { setModulePop(getmod) }}
              >
                <div className="card">
                  <div>
                    <div className="cardName">{getmod.name}</div>
                  </div>

                  <div className="iconBx">
                    <ion-icon name="laptop-outline"></ion-icon>
                  </div>
                  <a className="btn btn-info btn-lg "
                    href="/uploadpop/" onClick={() => { setModulePop(getmod) }}
                  >Pay</a>
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
