import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function TutorModules() {
  const [userData, setUserdata] = useState([]);
  const { name, email } = userData;
  const { tutor } = useParams();
  const url = tutor;

  console.log(useParams());

  const getModule = async (Id) => {
    console.log(Id);
    axios({
      method: "post",
      url: "http://localhost:5000/api/module/getModuleById",
      data: {
        Id: Id,
      },
    })
      .then((res) => {
        const [mod] = res.data
        return mod;
      })
      .catch((err) => alert(err));
  };
  
  useEffect(() => {
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/manager/tutorModules",
        data: {
          Id: tutor,
        },
      })
        .then((res) => {
          var data = res.data;
          var counter = 0;
          data.map(async(d) => {
            const mod = await getModule(d.moduleCode);
            data[counter] = {
              ...data[counter]
              ,...mod
            };
            counter = counter + 1;
            console.log(d)
          });
          setUserdata(data);
          console.log(data);
        })
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
        <h3 className="mb-5">Modules Tutored By {name}</h3>
        <input
          className="btn btn-info"
          type="submit"
          value="Add Module"
          // onClick={onSubmit}
        />
        <div className=" d-grid gap-2  ">
          <div className="cardHeader">
            <div className="cardBox">
              {userData.map((getmod) => (
                <a href={url + getmod.moduleCode}>
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
