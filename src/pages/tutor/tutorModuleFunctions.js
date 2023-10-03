import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { findModule, getModule, setModule } from "../../localstorage/module";
export default function TutorFunctions() {
  const [userData, setUserdata] = useState([]);
  useEffect(() => {
    const getUserdata = async () => {
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/myModules",
        data: {
          userId: localStorage.getItem("userId"),
        },
      }).then((res) => {
        setUserdata(res.data);
        console.log(res.data);
      });
    };
    getUserdata();
  }, []);

  const { module } = useParams();
  const _module = getModule()
  setModule(_module);
  const url = module;
  return (
    <div className="main">
      <div id="ForStudents">
        <div className=" p-5 text-center " style={{ paddingLeft: "30" }}>
          <h3 className="mb-5">{_module.name}</h3>

          <div className="new d-grid gap-2  ">
            <a
              className="btn btn-success  btn-lg btn-block "
              href={ "/announcement"}
                // onClick={onSubmit}
            >
              Write announcement
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              href={url + "/studentassessment"}

              //   onClick={onSubmit}
            >
              Assignments and Tests
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              href={"/issueclasses"}

              //   onClick={onSubmit}
            >
              Issue Class
            </a>
            {/* <a
              className="btn btn-success btn-lg btn-block"
              href={"/tchat"}
              type= "submit"
                // onClick={onSubmit}
            >
              Chat
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
