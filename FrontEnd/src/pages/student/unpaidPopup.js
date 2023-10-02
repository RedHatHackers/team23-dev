import React from "react";
import { useState, useEffect } from "react";
import { getModulePop } from "../../localstorage/pop";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function UploadPOP() {
    const module = getModulePop();
    const [formData, setFormData] = useState({
        file: null,
        studentId: localStorage.getItem("userId"),
        moduleCode: module.Id,
        date: new Date(),
    });

    var { file, studentId, moduleCode,date } = formData;

    const [useData, setUserData] = useState([]);
    const [popData, setPOPData] = useState([]);


    // const onSubmit = (e) => {
    //     file = file.name;
    //     console.log(formData);
    // };
    const onChangeDoc = (e) => {
        e.preventDefault();

        setFormData((prevState) => ({
          ...prevState,
          file: e.target.files[0],
        }));
        console.log(formData);
      };
    const onSubmit = (e) => {
        e.preventDefault();
    
        if (file === "" ) {
            console.log(formData);
          alert("please fill in all the fields");
        } else {
          const userData = {
            ...formData,
          };
          console.log(userData)
          axios({
            method: "post",
            headers: { "content-type": "multipart/form-data" },
    
            url: "http://localhost:5000/api/uploadproof",
            data: userData,
          })
            .then((res) => {
              alert("success: Task issued successfully");
              console.log(res.data)
            })
            .catch((err) => alert(" please try again"));
        }
      };

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const paidCount = 0;
    useEffect(() => {
        const getProof = async () => {
            const data ={studentId:localStorage.getItem("userId")}
        
           axios({
            method: "post",
            url: "http://localhost:5000/api/users/getPop",
            data: data
          })
            .then((res) => {
              setPOPData(res.data);
              console.log(res.data);
            })
            .catch((err) => console.log(err));
        };
        getProof();
      }, []);
    return (
        <div className="">
            <div className="main  p-5 text-center">
                <div className="cardHeader">
                    <h2>Banking Details</h2>
                </div>
                <label><b>Account Name: </b> Synat Tuition fee</label>
                <br />
                <label><b>Bank: </b> FNB</label>
                <br />
                <label><b>Account Type: </b> Cheque</label>
                <br />
                <label><b>Account Number: </b> 123456789</label>
                <br />
                <label><b>Referance : </b> Student name+ module </label>
                <br /> <br /> <br /> <br />
                <div>
                    <div className="cardHeader">
                        <h2 className=".text-success cardHeader">Upload Your proof of payment</h2>
                    </div>
                    <br />
                    <br />
                    <br />

                    <form>
                        <input 
                        type="file" 
                        id="file" 
                        onChange={onChangeDoc} required 
                        />
                        {/* <input
                            type="text"
                            id="description"
                            placeholder="file description"
                            onChange={onChange}
                            required
                        /> */}
                        <input
                            className="btn btn-info"
                            type="submit"
                            text="submit"
                            onClick={onSubmit}
                        />
                    </form>

                    <table class="table min-width">
                        <thead>
                            <tr>


                                <th>Proof of Payment</th>
                                <th>date</th>
                                <td></td>
                                <td></td>
                                <td></td><td></td><td></td><td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {popData.map((pop) => (

                                <tr>

                                    <td> <a href={"data:file/pdf;base64," + pop.pop} download={"Proof of payment.pdf"}>Proof of Payment</a></td>
                                    <td>{pop.datePaid}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td><td></td><td></td>
                                </tr>
                            ))}


                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
}
