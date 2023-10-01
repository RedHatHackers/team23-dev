import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { setModules } from "../../localstorage/module";
import { getTutor } from "../../localstorage/tutor";

export default function TutorModule() {
  const [userData, setUserdata] = useState([]);
  const [allocatedData, setaData] = useState([]);
  const [unAllocData, setUnAllocData] = useState([]);

  const tutor = getTutor();
  useEffect(() => {
    const getUserdata = async () => {
      const data = {
        tutorId: tutor.tutorId,
    };
      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/myModules",
        data: data
      })
        .then((res) => {
          setModules(res.data)
          setUserdata(res.data)})
        .catch((err) => alert(err));
    };
    getUserdata();
    const allocatedModules = async () => {
      const adata = { tutorId: localStorage.getItem("tutorId") }
      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/allocatedModules",
        data: adata,
  
      })
      .then((res) =>{ setaData(res.data)
      console.log(res.data)})
      .catch((err) => console.log(err));
       // console.log(res.data);  
    };
    allocatedModules();
    const unallocatedModules = async () => {
      const unAData = { tutorId: localStorage.getItem("tutorId") }
      axios({
        method: "post",
        url: "http://localhost:5000/api/tutor/unallocatedModules",
        data: unAData,
  
      })
      .then((res) => {setUnAllocData(res.data)
        console.log(res.data)})

      .catch((err) => console.log(err));
       // console.log(res.data);  
    };
    unallocatedModules();
  }, []);
  return (
    <React.Fragment>
      <div
        className="main class p-5 text-center "
        style={{ paddingLeft: "30" }}
      >
        <h3 className="mb-5">My Modules</h3>

        <div className=" d-grid gap-2  ">
          <div className="cardHeader">
            <div className="cardBox">
              {userData.map((getmod) => (
                <a href={'/mymodules/'+getmod.code}>
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
