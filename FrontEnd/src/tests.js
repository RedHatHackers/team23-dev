import axios from "axios";

export default function first(second) {
  axios({
    method: "post",
   // headers: { "content-type": "multipart/form-data" },

    url: "http://localhost:5000/api/users/getTasks",
    data: { moduleCode: 1 ,tutorId:112},
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => alert(" please try again"));

  return <></>;
}
