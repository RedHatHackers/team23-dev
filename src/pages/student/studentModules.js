import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getModule } from "../../localstorage/module";
import { setTutor } from "../../localstorage/tutor";
import "../chat.css";
export default function StudentModule() {
  const module = getModule();
  const [userData, setUserdata] = useState([]);
  const [tutorData, setTutorData] = useState([]);
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

    const getTutorData = async () => {
      const data = {
        studentId: localStorage.getItem("userId"),
        moduleCode: module.Id,
      };
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/getTutorByIdCode",
        data: data,
      }).then((res) => {
        setTutor(res.data);
        setTutorData(res.data);
        console.log(res.data);
      });
    };
    getTutorData();
  }, []);

  const url = module.name;
  console.log(useParams());
  return (
    <div>
      <div id="ForStudents">
        <div className=" main p-5 text-center " style={{ paddingLeft: "30" }}>
          <h3 className="mb-5">{module.name}</h3>

          <div className="new d-grid gap-2  ">
            <a
              className="btn btn-success  btn-lg btn-block "
              href={url + "/uploadDoc"}
            //   onClick={onSubmit}
            >
              Upload Documents
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              href={url + "/studentassessment"}

            //   onClick={onSubmit}
            >
              Assignment and Tests
            </a>

            <a
              className="btn btn-success btn-lg btn-block"
              type="submit"
              //   onClick={onSubmit}
              href="https://calendly.com/synattutorsbookings"            >
              Book consultation
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              type="submit"
              //   onClick={onSubmit}
              href={url + "/joinclass"}
            >
              join zoom/google meeting
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              type="submit"
              //   onClick={onSubmit}
              href={"/chat"}
            >
              Chats
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              href="/MyPerfomance"
              //   onClick={onSubmit}
            >
              My Performance
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
