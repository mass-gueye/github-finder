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

// Get user and repos
const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};

export { searchUsers, getUserAndRepos };
