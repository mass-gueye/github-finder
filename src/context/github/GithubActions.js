import axios from "axios";

const token = process.env.REACT_APP_GITHUB_TOKEN;
const url = process.env.REACT_APP_GITHUB_API_URL;

const github = axios.create({
  baseURL: url,
  headers: {
    Authorization: `token ${token}`,
  },
});

// Get search results
const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  let response = await github.get(`/search/users?${params}`, {
    headers: {
      Authorization: token,
    },
  });

  const { items } = await response.data;
  return items;
};

// clear user
// const clearUsers = () => {
//   dispatch({ type: "CLEAR_USERS" });
// };

// getiing single user
const getSingleUser = async (login) => {
  const response = await fetch(`${url}/users/${login}`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const user = await response.json();

    return user;
  } else {
    window.location = "/notfound";
  }
};

// get user repos
const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const response = await fetch(`${url}/users/${login}/repos?${params}`, {
    headers: {
      Authorization: token,
    },
  });

  if (response.ok) {
    const repos = await response.json();

    return repos;
  } else {
    window.location = "/notfound";
  }
};

// Get user and repos
// export const getUserAndRepos = async (login) => {
//     const [user, repos] = await Promise.all([
//       github.get(`/users/${login}`),
//       github.get(`/users/${login}/repos`),
//     ])

//     return { user: user.data, repos: repos.data }
//   }

export { searchUsers, getSingleUser, getUserRepos };
