import React, { useState } from "react";

export default function UploadDoc() {
  const [formData, setFormData] = useState({
    file: "",
    fileName: "",
    fileDescription: "",
  });

  var { file, fileName, fileDescription } = formData;
  
  const onSubmit = (e) => {
    fileName = file.name;
    console.log(formData);
  };
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };
  return (
    <div className="">
      <div className="main p-5 text-center">
        <div>
          <div className="">
            <h4 className=".text-success">upload school test results</h4>

            <br />
            <br />
            <br />

            <form>
              <input type="file" id="file" onChange={onChange} required />
              <input
                type="text"
                id="description"
                placeholder="file description"
                onChange={onChange}
                required
              />
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
                  <th>#</th>
                  <th>fileName</th>
                  <th>FIle description</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
