import NotFound from "./pages/NotFound.js";
import Login from "./pages/login";

import Register from "./pages/Register/register";
import Wait from "./pages/Register/wait";
import BecomeTutor from "./pages/Register/becomeTutor";

import Home from "./pages/student/studentHome";
import StudentClass from "./pages/student/studentClasses";
import StudentTutors from "./pages/student/myTutors";
import Offered from "./pages/student/whatweoffer";
import AttendClass from "./pages/student/joinClass";
import UploadProofOfPayment from "./pages/student/unpaidPopup";
import TaskSubmission from "./pages/student/taskSubmission";
import Profile from "./pages/student/studentProfile";
import StudentModule from "./pages/student/studentModules";
import StudentAssessment from "./pages/student/studentAssesment";

import UploadDoc from "./components/uploadDoc";
import Layout from "./components/layout";
import Sidenav from "./components/sidenav";
import ManagerSidenav from "./components/Manager/managerSidenav";

import ManageTutorModule from "./pages/manager/manageTutorModule";
import ViewApplication from "./pages/manager/viewApplication";
import StudentPayments from "./pages/manager/studentPayment";
import SynatTutors from "./pages/manager/myTutors";
import AddModule from "./pages/manager/addModules.js";
import Modules from "./pages/manager/modules";
import UpdateModule from "./pages/manager/updateModule";
import EditModule from "./pages/manager/editModule";
import ManageModule from "./pages/manager/addModules";
import TutorApplication from "./pages/manager/tutorApplications";
import RegisterUser from "./pages/manager/registerUsers";
import ManagerStats from "./pages/manager/stats.js";


import TutorClass from "./pages/tutor/myClass";
import WHatToTutor from "./pages/tutor/whatToTutor";
import MyStudents from "./pages/tutor/myStudents";
import TutorProfile from "./pages/tutor/tutorProfile";
import ToTutor from "./pages/tutor/whatToTutor";
import TutorModules from "./pages/tutor/tutMod";
import TutorAssessment from "./pages/tutor/assesment";
import TutorFunctions from "./pages/tutor/tutorModuleFunctions";
import ViewSubmissions from "./pages/tutor/viewTaskSubmissions";
import ViewSingleSubmission from "./pages/tutor/viewSingleTaskSubmission.js";
import Announce from "./pages/tutor/tutorAnnouncement.js";
import IssueClassLink from "./pages/tutor/issueClass.js";
import TUTViewAnnouncements from "./pages/tutor/viewAnnouncements.js";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  StudentRoutes,
  PublicRoutes,
  ManagerRoutes,
  TutorRoutes,
  PrivateRoutes,
} from "./utils/PrivateRoutes";
import AddModules from "./pages/manager/addModules";
import Tests from "./tests";
import MyProfile from "./pages/student/studentProfile";
import EditTask from "./pages/tutor/editTask.js";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />

          {
            // Student routes
            <Route element={<StudentRoutes />}>
              <Route
                element={<Layout Centre={Home} />}
                path="/noticeboard"
                exact
              />
              <Route
                element={<Layout Centre={StudentClass} />}
                path="/classes"
              />
          

              <Route element={<Layout Centre={Profile} />} path="/myprofile" />
              <Route element={<Layout Centre={Offered} />} path="/offered" />

              <Route
                element={<Layout Centre={UploadDoc} />}
                path="/classes/:module/uploadDoc"
              />
              <Route
                element={<Layout Centre={StudentModule} />}
                path="/classes/:module"
              />
              <Route
                element={<Layout Centre={UploadProofOfPayment} />}
                path="/uploadpop"
              />
              <Route
                element={<Layout Centre={StudentAssessment} />}
                path="/classes/:module/studentassessment"
              />
              <Route
                element={<Layout Centre={TaskSubmission} />}
                path="/tasksubmissions"
              />
              <Route
                element={<Layout Centre={AttendClass} />}
                path="/classes/:module/joinclass"
              />
            </Route>
          }

          {
            // Manager routes
            <Route element={<ManagerRoutes />}>
              <Route
                element={<ManagerSidenav MCentre={RegisterUser} />}
                path="/reguser"
              />
              <Route
                element={<ManagerSidenav MCentre={TutorApplication} />}
                path="/tutorapplication"
              />
                <Route
                element={<ManagerSidenav MCentre={ManagerStats} />}
                path="/stats"
              />
              <Route
                element={<ManagerSidenav MCentre={ViewApplication} />}
                path="/viewApplication/:tutorEmail"
              />
              <Route
                element={<ManagerSidenav MCentre={Modules} />}
                path="/modules"
              />
              <Route
                element={<ManagerSidenav MCentre={AddModule} />}
                path="/addmodule"
              />
              <Route
                element={<ManagerSidenav MCentre={SynatTutors} />}
                path="/myTutors"
              />
              <Route
                element={<ManagerSidenav MCentre={StudentPayments} />}
                path="/studentpayments"
              />
              <Route
                element={<ManagerSidenav MCentre={UpdateModule} />}
                path="/updateModules"
              />
              <Route
                element={<ManagerSidenav MCentre={EditModule} />}
                path="/updateModules/:module"
              />
              <Route
                element={<ManagerSidenav MCentre={ManageTutorModule} />}
                path="/mytutors/:tutor"
              />
            </Route>
          }

          {
            // Tutor routes
            <Route element={<TutorRoutes />}>
              <Route
                element={<Sidenav TCentre={TutorClass} />}
                path="/tutorclass"
              />
              <Route
                element={<Sidenav TCentre={MyProfile} />}
                path="/tutorprofile"
              />
              <Route
                element={<Sidenav TCentre={Announce} />}
                path="/announcement"
              />
               <Route
                element={<Sidenav TCentre={TUTViewAnnouncements} />}
                path="/viewAnnouncements"
              />
              <Route
                element={<Sidenav TCentre={ViewSubmissions} />}
                path="/submissions"
              />
                <Route
                element={<Sidenav TCentre={IssueClassLink} />}
                path="/issueclasses"
              />
              <Route
                element={<Sidenav TCentre={ViewSingleSubmission} />}
                path="/viewsinglesubmission"
              />
              <Route
                element={<Sidenav TCentre={TutorFunctions} />}
                path="/mymodules/:module"
              ></Route>
              <Route
                element={<Sidenav TCentre={MyStudents} />}
                path="/mystudents"
              ></Route>
              <Route
                element={<Sidenav TCentre={TutorModules} />}
                path="/mymodules"
              ></Route>
              <Route
                element={<Sidenav TCentre={TutorAssessment} />}
                path="/mymodules/:module/studentassessment"
              ></Route>
              <Route
                element={<Sidenav TCentre={ToTutor} />}
                path="/toTutor"
              ></Route>

              <Route element={<Sidenav TCentre={EditTask} />}
                path="/editTask"></Route>
            </Route>
          }

          {
            // public routes
            <Route element={<PublicRoutes />}>
              <Route element={<Login />} path={"/login"} />
              <Route element={<Login />} path={"/"} />
              <Route element={<Register />} path="/register" />
              <Route element={<Wait />} path="/wait" />
              <Route element={<BecomeTutor />} path="/becometutor" />

              <Route element={<Sidenav TCentre={Tests} />} path="/Tests" />
            </Route>
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
