const baseUrl = "http://localhost:3000/api/v001";
const formulasUrl = `${baseUrl}/formulas`;
const usersUrl = `${baseUrl}/users`;
const ingredientsUrl = `${baseUrl}/ingredients`;
const areasUrl = `${baseUrl}/areas`;
const favouritesUrl = `${baseUrl}/favourites`;
const profileUrl = `${baseUrl}/profile`;
const loginUrl = `${baseUrl}/login`;

// ============================ Auth/Login functions =========================================

const loginPost = user => {
  return loginCall(loginUrl, user);
};

const loginCall = (url, user) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(user)
  };
  return fetch(url, options).then(resp => resp.json());
};

const getProfile = () => {
  return getFunction(profileUrl);
};

// const login = user => {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({
//       user
//     })
//   };

//   return fetch(loginUrl, options).then(resp => resp.json());
// };

// ============================ GET FUNCTIONS =========================================
const getFormulas = () => {
  return getFunction(formulasUrl);
};

const getIngredients = () => {
  return getFunction(ingredientsUrl);
};

// const getUsers = () => {
//   return getFunction(usersUrl);
// };

const getAreas = () => {
  return getFunction(areasUrl);
};

const getFavourites = () => {
  return getFunction(favouritesUrl);
};

const getFunction = url => {
  const options = {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("token")
    }
  };
  return fetch(url, options).then(resp => resp.json());
};

// =========================================POST FUNCTIONS  =======================================================

//create user doesnt authorize a token because there isnt one at this point
const createUser = user => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  };

  return fetch(usersUrl, options).then(resp => resp.json());
};

const createFormula = formula => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(formula)
  };

  return fetch(formulasUrl, options).then(resp => resp.json());
};

const createFavourite = favourite => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },
    body: JSON.stringify(favourite)
  };

  return fetch(favouritesUrl, options).then(resp => resp.json());
};
// ================================= PATCH FUNCTION ===========================================

const editFormula = formula => {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    },

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
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
  };

  return fetch(`${formulasUrl}/${formula.id}`, options).then(resp =>
    resp.json()
  );
};

const deleteFavourite = favourite => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token")
    }
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
  loginPost,
  getFormulas,
  getIngredients,
  getAreas,
  getFavourites,
  deleteFavourite,
  createUser,
  getProfile
};
