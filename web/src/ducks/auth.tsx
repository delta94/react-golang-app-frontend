import { RouteComponentProps } from "react-router-dom";
import api from "../config/axiosConfig";
import { types } from "../store/reducer";
import { store } from "../store/store";

export type User = {
  Address: string;
  Avatar: string;
  Birthday: string;
  CreatedAt: string;
  DeletedAt: {
    Time: string;
    Valid: boolean;
  };
  Email: string;
  FacebookID: string;
  Gender: string;
  ID: string;
  Name: string;
  Password: string;
  Phone: string;
  UpdatedAt: string;
};

//Login function
export function login(email: string, password: string) {
  return function (dispatch: any) {
    return api
      .post(`/v1/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        dispatch({
          type: types.API_TOKEN,
          payload: response.data.token,
        });
        dispatch({
          type: types.LOGGED_USER,
          payload: response.data.user,
        });
        return Promise.resolve<boolean>(true);
      })
      .catch((error) => {
        dispatch({
          type: types.ERROR,
          payload: error,
        });
        let msg =
          error.response.data === "Wrong password"
            ? "Senha incorreta"
            : error.response.data === "No user with this email"
            ? "Nenhum usuário com este email"
            : "Erro inesperado!";
        return Promise.reject<string>(msg);
      });
  };
}

//Add user in the api without token
export function signup(form: FormData) {
  return function (dispatch: any) {
    return api
      .post(`/v1/signUp`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return Promise.resolve(true);
      })
      .catch((error) => {
        dispatch({
          type: types.ERROR,
          payload: error,
        });
        return Promise.reject(error.response.data);
      });
  };
}

//Remove token and user logged, redirect to login screen
export function logout(props: RouteComponentProps) {
  return function (dispatch: any) {
    props.history.push("/prelogin");
    return dispatch({
      type: types.LOGOUT,
      payload: "",
    });
  };
}

//Verify if a user is logged in
export function verifyLoggedUser() {
  const data: any = store.getState();
  const main = data.loggedUser;

  return main;
}
