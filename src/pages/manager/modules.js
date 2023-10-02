import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function StudentModule() {
  return (
    <div>
      <div id="ForStudents">
        <div className=" main p-5 text-center " style={{ paddingLeft: "30" }}>
          <h3 className="mb-5"></h3>

          <div className="new d-grid gap-2  ">
            <a
            
            className="btn btn-success btn-lg btn-block"
              href="/updateModules"
              //   onClick={onSubmit}
            >
              Update Modules
            </a>
            <a
              className="btn btn-success btn-lg btn-block"
              href="/addmodule"

              //   onClick={onSubmit}
            >
              Add Module
            </a>
            
          </div>
        </div>
      </div>
    </div>
  );
}
