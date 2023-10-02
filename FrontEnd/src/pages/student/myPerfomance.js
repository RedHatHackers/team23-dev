import { useEffect, useState } from "react";
import axios from "axios";
import { getTutor } from "../../localstorage/tutor";
import { getModule } from "../../localstorage/module";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function MyPerfomance() {
  const tutor = getTutor();
  const module = getModule();
  const [performanceData, setPerformanceData] = useState([]);
  useEffect(() => {
    const getPerformanceData = async () => {
      const data = {
        moduleCode: module.Id,
        tutorId: tutor.tutorId,
        studentId: localStorage.getItem("userId"),
      };
      axios({
        method: "post",
        url: "http://localhost:5000/api/users/MyPerfomance",
        data: data,
      }).then(async (res) => {
        const result = res.data;
        setPerformanceData(await result);
      });
    };
    getPerformanceData();
  }, []);
  const getColor = (performance) => {
    const percentage = performance.submission
      ? (performance.submission.mark / performance.task.total) * 100
      : "";

    if (percentage === "") return "Black";
    else if (percentage < 50) return "Red";
    else if (percentage < 70) return "Orange";
    else return "DarkGreen";
  };

  const getMark = (performance) => {
    return (
      (performance.submission ? performance.submission.mark : "") +
      "/" +
      performance.task.total
    );
  };
  return (
    <>
      <div className="main  p-5 text-center">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Assignment</th>
              <th scope="col">Mark</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((performance) => (
              <tr>
                <td>{performance.task.title}</td>
                <td style={{ color: getColor(performance) }}>
                  <h3> {getMark(performance)}</h3>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
