import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { getTutor } from "../../localstorage/tutor";
import { setModule, setModules } from "../../localstorage/module";

export default function Module() {



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
        data: data,
      })
      .then((res) => {
        setModules(res.data)
        setUserdata(res.data)})
      .catch((err) => alert(err));
    };
    getUserdata();
    const allocatedModules = async () => {
        const adata = { tutorId: tutor.tutorId}
        axios({
          method: "post",
          url: "http://localhost:5000/api/tutor/allocatedModules",
          data: adata,
    
        })
        .then((res) =>{ setaData(res.data)
        console.log({AllocData:res.data})})
        .catch((err) => console.log(err));
         // console.log(res.data);  
      };
      allocatedModules();

      const unallocatedModules = async () => {
        const unAData = { tutorId:  tutor.tutorId}
        axios({
          method: "post",
          url: "http://localhost:5000/api/tutor/unallocatedModules",
          data: unAData,
    
        })
        .then((res) => {setUnAllocData(res.data)
          console.log({UnAllocData:res.data})})
  
        .catch((err) => console.log(err));
         // console.log(res.data);  
      };
      unallocatedModules();
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
            {allocatedData.map((getAmod) => (
              <a href={'/mymodules/' + getAmod.name} onClick={()=>{
                
                setModule(getAmod);
              }}>
                <div className="card">
                  <div>
                    <div className="cardName font-lg">{getAmod.name}</div>
                  </div>

                  
                         <button className="btn-md btn-success">
                            Allocated
                      </button>                  
                
                </div>
              </a>
            ))}
             {unAllocData.map((getUnAmod) => (
              <a href="#" >
                <div className="card">
                  <div>
                    <div className="cardName">{getUnAmod.name}</div>
                  </div>

                  
                  <button className="btn-md btn-warning">
                            Unallocated
                      </button>                 
               

                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
 
    {/* <br/>
    <div
      className="main class p-5 text-center center-block "
      style={{ paddingLeft: "30" }}
    >
     <div className="cardHeader ">
      <h2 className="mb-5">Unallocated Modules</h2>
      </div>
      <div className=" d-grid gap-2  ">
        <div className="cardHeader">
          <div className="cardBox">
            {unAllocData.map((getUnAmod) => (
              <a href="/unallocated/" >
                <div className="card">
                  <div>
                    <div className="cardName">{getUnAmod.name}</div>
                  </div>

                  <div className="iconBx">
                  <button className="btn-md btn-secondary">
                            Unallocated
                      </button>                 
               </div>

                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div> */}
  </React.Fragment>
);
}
