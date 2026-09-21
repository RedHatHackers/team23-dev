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
    const [statsData, setStatsData] = useState([])
    const [moduleCount, setmoduleCount] = useState({})
    const [studentCount, setStudentCount] = useState({})
    const [tutorCount, setTutorCount] = useState({})
    const [tutorModuleCount, setTutormoduleCount] = useState({})
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
        }
        fetchStats()
        setStatsData([moduleCount, tutorCount, studentCount])
        console.log(tutorModuleCount)
    }, []);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <div style={{ textAlign: "center" }}>
            <div className="text-align-center">
            <h1>Synat Reports and stats</h1>
            </div>
            
            <div className="App">
                <PieChart width={600} height={600}>
                    <Pie
                        dataKey="total"
                        isAnimationActive={false}
                        data={statsData}
                        cx={200}
                        cy={200}

                        outerRadius={100}
                        innerRadius={75}
                        fill="#8884d8"
                        label
                    >
                        {statsData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>

             
                <BarChart
                    width={500}
                    height={300}
                    data={tutorModuleCount}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
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
        </div>
    );
};
