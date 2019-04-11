const baseUrl = "http://localhost:3000/api/v001";
const formulasUrl = `${baseUrl}/formulas`;
const usersUrl = `${baseUrl}/users`;
const ingredientsUrl = `${baseUrl}/ingredients`;
const areasUrl = `${baseUrl}/areas`;
const loginUrl = `${baseUrl}/login`;
const favouritesUrl = `${baseUrl}/favourites`;

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

const getFavourites = () => {
  return getFunction(favouritesUrl);
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

const createFormula = formula => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formula)
  };

  return fetch(formulasUrl, options).then(resp => resp.json());
};

const createFavourite = favourite => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(favourite)
  };

  return fetch(favouritesUrl, options).then(resp => resp.json());
};
// ================================= PATCH FUNCTION ===========================================

const editFormula = formula => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formula
    })
  };
  return fetch(`${formulasUrl}/${formula.id}`, options).then(resp =>
    resp.json()
  );
};

//============================================ delete functions =================================

const deleteFormula = formula => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`${formulasUrl}/${formula.id}`, options).then(resp =>
    resp.json()
  );
};

const deleteFavourite = favourite => {
  const options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(`${favouritesUrl}/${favourite.id}`, options).then(resp =>
    resp.json()
  );
};

// ======================================== export =========================================

export default {
  createFavourite,
  deleteFormula,
  editFormula,
  createFormula,
  login,
  getFormulas,
  getUsers,
  getIngredients,
  getAreas,
  getFavourites,
  deleteFavourite
};
