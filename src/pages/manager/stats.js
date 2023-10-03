import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell,
} from "recharts";

import "./stats.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Stats() {
  const [statsData, setStatsData] = useState([]);
  const [moduleCount, setmoduleCount] = useState({});
  const [studentCount, setStudentCount] = useState({});
  const [tutorCount, setTutorCount] = useState({});
  const [tutorModuleCount, setTutormoduleCount] = useState([]);
  const RevenueStats = []
  useEffect(() => {
    const fetchStats = async () => {
      await axios({
        method: "get",
        url: "http://localhost:5000/api/manager/getStudentCount",
      })
        .then((res) => {
          setStudentCount({ ...res.data, name: "Students" });
        })
        .catch((err) => console.log(err));
      await axios({
        method: "get",
        url: "http://localhost:5000/api/manager/getTutorCount",
      })
        .then((res) => {
          setTutorCount({ ...res.data, name: "Tutors" });
        })
        .catch((err) => console.log(err));

      await axios({
        method: "get",
        url: "http://localhost:5000/api/manager/getModuleCount",
      })
        .then((res) => {
          setmoduleCount({ ...res.data, name: "Modules" });
        })
        .catch((err) => console.log(err));
      await axios({
        method: "get",
        url: "http://localhost:5000/api/manager/getModuleTutorCount",
      })
        .then((res) => {
          setTutormoduleCount(res.data);
      
        })
        .catch((err) => console.log(err));
    };
    fetchStats();
    setStatsData([moduleCount, tutorCount, studentCount]);
    console.log(tutorModuleCount);
    
  }, [2]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  const getTotalRev = ()=>{
    var tot=0;
    tutorModuleCount.map((mod)=>{
        tot+=mod.price;
    })
    return tot;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className="text-align-center">
        <h1>Synat Reports and stats</h1>
      </div>

      <div className="App">
        <p>Student : tutor ratio</p>
        <BarChart
          width={500}
          height={300}
          data={tutorModuleCount}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="students" fill="#8884d8" />
          <Bar dataKey="tutors" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className="main  p-5 text-center">
        <h3 style={{color:"Green"}}>Expected revenue</h3>
        <br/>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Module</th>
              <th scope="col">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {tutorModuleCount.map((mod) => (
              <tr>
                <td>{mod.name}</td>
                <td>
                 R {mod.students * mod.price}
                </td>
              </tr>
            ))}
             <tr>
                <td></td>
                <td style={{color:"Blue"}}>
                 R{getTotalRev()}
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
