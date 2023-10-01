import React from "react";
import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Payments from "../../components/student/payment";

export default function ViewStudentPayments() {
  // const { code,studentId, popDoc } = proofData;

  const [proofData, setProofData] = useState([]);

  useEffect(() => {
    const getProof = async () => {
      axios({
        method: "get",
        url: "http://localhost:5000/api/manager/getProof",
      })
        .then((res) => {
          setProofData(res.data);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    };
    getProof();
  }, []);

  return (
    <div className="main details" style={{ backgroundColor: "#fff" }}>
      <div className="">
        <div className=" cardHeader justify-content-center">
          <h2>Payments</h2> <br /> <br /> <br />
          {/* <a href="/#" className="btn">View All</a> */}
        </div>
        <br />
        <table className="table min-width">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Student Email</th>
              <th>Module Name</th>
              <th>Proof</th>
              <th>Date Uploaded</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {proofData.map((paid) => (
              <>
                <Payments pay={paid} />
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
