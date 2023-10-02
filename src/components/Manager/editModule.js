import axios from "axios";


export const deleteMod = (e) => {
   console.log(e)
    axios({
        method: "delete",
        url: "http://localhost:5000/api/module/deletemodule",
        data: {
            code: e.target.id
        },
    })
        .then((res) => {
            if (res.status === 200)
                alert("success: Module deleted");
            else
                alert("error: Module not found");

        })
        .catch((err) => alert(alert(err)));

}; export const editMod = (e) => {
    console.log(e.target)
};