const baseUrl = "http://localhost:3000/api/v001";
const formulasUrl = `${baseUrl}/formulas`;
const usersUrl = `${baseUrl}/users`;
const ingredientsUrl = `${baseUrl}/ingredients`;
const areasUrl = `${baseUrl}/areas`;
const loginUrl = `${baseUrl}/login`;

// ============================ GET FUNCTIONS =========================================

const login = user => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify({
      user
    })
  };

  const createUser = user => {};

  return fetch(loginUrl, options).then(resp => resp.json());
};

const getFormulas = () => {
  return getFunction(formulasUrl);
};

const getIngredients = () => {
  return getFunction(ingredientsUrl);
};

const getUsers = () => {
  return getFunction(usersUrl);
};

const getAreas = () => {
  return getFunction(areasUrl);
};

const getFunction = url => {
  // const options = {
  //   method: "GET",
  //   headers: {
  //     Authorization: localStorage.getItem("token")
  //   }
  // };
  return fetch(url).then(resp => resp.json());
};

// =========================================POST FUNCTIONS  =======================================================

export default {
  login,
  getFormulas,
  getUsers,
  getIngredients,
  getAreas
};
