import axios from "axios";
import { useEffect, useState } from "react";

export default function Payments({ pay: payment }) {
  const [studentData, setstudentData] = useState([]);
  const [moduleData, setmoduleData] = useState([]);
  useEffect(() => {
    const getStudent = async () => {
      const stData = { Id: payment.studentId };
      await axios({
        method: "post",
        url: "http://localhost:5000/api/users/getStudent",
        data: stData,
      })
        .then((res) => {
          setstudentData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getStudent();

    const getModule = async () => {
      const mdData = { Id: payment.moduleCode };
      await axios({
        method: "post",
        url: "http://localhost:5000/api/module/getModuleById",
        data: mdData,
      })
        .then((res) => {
          setmoduleData(res.data);
        })
        .catch((err) => console.log(err));
    };
    getModule();
  }, []);
  const onAcceptPayment = (e) => {
    e.preventDefault();
    const data = {
      moduleCode: moduleData.Id, studentId: studentData.Id
    }
    axios({
      method: "post",
      url: "http://localhost:5000/api/manager/confirmPayment",
      data: data

    }).then((res) => {
      alert("success: Payment Accepted");


    })
      .catch((err) => console.error(err));
  }
  return (
    <tr>
      <td>{studentData.name}</td>
      <td>{studentData.email}</td>
      <td>{moduleData.name}</td>
      <td>
        <a
          href={"data:file/pdf;base64," + payment.pop}
          download={"proof of payment -" + moduleData.name + ".pdf"}
        >
          proof of payment
        </a>
      </td>
      <td>{payment.datePaid}</td>

      <td>
        {/* <!-- Call to action buttons --> */}
        <ul className="list-inline m-0">
          <li className="list-inline-item">
            <button
              onClick={onsubmit}
              id=""
              className="btn btn-danger btn-sm rounded-0"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Decline"
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <button
              onClick={onAcceptPayment}
              id=""
              className="btn btn-success btn-sm rounded-0"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Accept"
            >
              <i className="fas fa-thumbs-up"></i>
            </button>
          </li>
        </ul>
      </td>
    </tr>
  );
}
