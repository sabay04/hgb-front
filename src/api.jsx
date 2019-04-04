const baseUrl = "http://localhost:3000/api/v001";
const formulasUrl = `${baseUrl}/formulas`;
const usersUrl = `${baseUrl}/users`;
const ingredientsUrl = `${baseUrl}/ingredients`;
const areasUrl = `${baseUrl}/areas`;

// ============================ GET FUNCTIONS =========================================

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
  getFormulas,
  getUsers,
  getIngredients,
  getAreas
};
