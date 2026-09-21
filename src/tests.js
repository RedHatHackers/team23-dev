import axios from "axios";

export default function first(second) {
  axios({
    method: "post",
   // headers: { "content-type": "multipart/form-data" },

    url: "http://localhost:5000/api/users/myAnnouncement",
    data: { studentId : 101},
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => alert(" please try again"));

  return <></>;
}
