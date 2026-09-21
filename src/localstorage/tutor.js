import axios from "axios";

export async function setTutorByEmail(email) {
  var ax = axios({
    method: "post",
    url: "http://localhost:5000/api/tutor/getTutor",
    data: { email: email },
  })
    .then(async (res) => {
      setTutor(res.data);
      console.log(res.data);
    })
    .catch((err) => console.log(err));
  console.log(ax);
}

// sets tutor profile
export function setTutor(tutor) {
  localStorage.setItem("tutor", JSON.stringify(tutor));
}

// gets tutor profile
export function getTutor() {
  return JSON.parse(localStorage.getItem("tutor"));
}
