import React from "react";


export default function myClasses() {
    return (
        <div className=" main p-5 text-center " style={{paddingLeft:"30"}}>
            <h3 className="mb-5">Manage Tutor Class</h3>

            
                <div className="new d-grid gap-2  " >
                    
                    <button 
                        className="btn btn-success  btn-lg btn-block "
                        type="submit"
                        href="/attendance.js"
                    //   onClick={onSubmit}
                    >
                        Create Attendance Code 
                    </button>
                    <button
                        className="btn btn-success btn-lg btn-block"
                        type="submit"
                    //   onClick={onSubmit}
                    >
                        Post Announcements
                    </button>

                    <button
                        className="btn btn-success btn-lg btn-block"
                        type="submit"
                    //   onClick={onSubmit}
                    >
                        Post Content
                    </button>
                    <button 
                        className="btn btn-success  btn-lg btn-block "
                        type="submit"
                        href="/attendance.js"
                    //   onClick={onSubmit}
                    >
                        View Attendances 
                    </button>
                </div>
            </div>
    
        
    );
}


