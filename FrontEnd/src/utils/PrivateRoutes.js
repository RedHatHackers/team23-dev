import { Outlet, Navigate } from "react-router-dom";

export const PublicRoutes = (props) => {
  let token = localStorage.getItem("token");
  // if logged in don't show login/register route
  return token ? <Navigate to="/noticeboard" /> : <Outlet />;
};
export function PrivateRoutes(props) {
  let token = localStorage.getItem("token");
  return token ? <Outlet /> : redirect();
}

export function StudentRoutes(props) {
  let token = localStorage.getItem("token");
  let usertype = localStorage.getItem("usertype");
  return token && usertype === "S" ? <Outlet /> : redirect();
}

export const TutorRoutes = (props) => {
  let token = localStorage.getItem("token");
  let usertype = localStorage.getItem("usertype");
  console.log(token);
  return token && usertype === "T" ? <Outlet /> : redirect();
};

export const ManagerRoutes = (props) => {
  let token = localStorage.getItem("token");
  let usertype = localStorage.getItem("usertype");

  return token && usertype === "M" ? <Outlet /> : redirect();
};

// redirections

const redirect = () => {
  let usertype = localStorage.getItem("usertype");

  // localStorage.setItem("usertype",'');
  // localStorage.setItem("token",'');
  
  if (usertype === "T") {
    return <Navigate to="/mystudents"></Navigate>;
  } else if (usertype === "S") {
    return <Navigate to="/NoticeBoard"></Navigate>;
  } else if (usertype === "M") {
    return <Navigate to="/regUser"></Navigate>;
  } else if (usertype === "W") {
    //wait for approval
    return <Navigate to="/wait"></Navigate>;
  } else {
    return <Navigate to="/register"></Navigate>;
  }
};
