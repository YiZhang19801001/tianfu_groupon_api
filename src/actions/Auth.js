import types from "./actionTypes";
import { kidsnparty } from "../apis";
import { history } from "../history";

const check = () => {
  const user = JSON.parse(localStorage.getItem("tianfu_groupon_user"));

  //if user not exist OR user is not a staff return to login page
  if (!user || parseInt(user.user_group_id) !== 3) {
    history.push(`${process.env.PUBLIC_URL}/login`);
    return { type: types.userLogin, payload: {} };
  }

  //if there is a logged in user, call api to further check,and also fetch the role based access information for this user

  history.push(`${process.env.PUBLIC_URL}/products`);
  return { type: types.userLogin, payload: user };
};

const login = () => async (dispatch, getState) => {
  const requestBody = getState().form.loginForm.values;

  const response = await kidsnparty.post("user/login", requestBody);

  if (response.data.success) {
    localStorage.setItem(
      "tianfu_groupon_user",
      JSON.stringify(response.data.data)
    );
    dispatch({ type: types.userLogin, payload: response.data.data });
    history.push(`${process.env.PUBLIC_URL}/products`);
  } else {
    alert("login fail, password or phone No. incorrect.");
  }
};

export default { login, check };
