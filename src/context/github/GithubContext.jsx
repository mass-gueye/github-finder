import React, { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();
const token = process.env.REACT_APP_GITHUB_TOKEN;
const url = process.env.REACT_APP_GITHUB_API_URL;

export function GithubProvider({ children }) {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);
  // set loading

  // get initial users for testing purposes
  const fetchUsers = async () => {
    setLoading();
    let response = await fetch(`${url}/users`, {
      headers: {
        Authorization: token,
      },
    });

    if (response.ok) {
      let data = await response.json();

      dispatch({
        type: "GET_USERS",
        payload: data,
      });
    } else {
      alert("HTTP-Error: " + response.status);
    }
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
}

export default GithubContext;
