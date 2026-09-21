
const initialState = {
  name: "",
  email: "",
  password: "",
  surname: "",
  token: "",
};

export  const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      const { Id,name, email, password, surname, token, usertype } =
        action.payload;
      state = {
        ...state,
        name,
        email,
        password,
        surname,
        token,
      };

      localStorage.setItem("token", token);
      localStorage.setItem("usertype", usertype);
      localStorage.setItem("userId", Id);


      break;
    case "LOGOUT":
      state = initialState;
      localStorage.clear();
      break;
  }
  return state;
};
