const BaseUrl = 'https://flavorfinesse.onrender.com/api/v1/';
// const BaseUrl = 'localhost:4000/api/v1/';

const spoonacularBaseApi = 'https://api.spoonacular.com/recipes/';
let apiKey = 'a4b50434521144df923382d472aadfe1';

export const sendRequest = async ({ url, data, method, token }) => {
  await getApiKey();

  try {
    const response = await fetch(`${BaseUrl}${url}`, {
      method: method ? method : 'get',
      headers: {
        'Content-Type': 'application/json',
        // Wrap 'Authorization' in quotes to make it a string
        [token && 'Authorization']: token && `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const newData = await response.json();
    return newData;
  } catch (error) {
    return error;
  }
};

export const getApiKey = async () => {
  try {
    const response = await sendRequest({ url: `users/getKey` });
    apiKey = response.apiKey;
  } catch (error) {}
};

export const searchRecipes = async (data) => {
  const query = data.query;
  const type = data.type;
  const number = 10;

  try {
    const response = await fetch(
      `${spoonacularBaseApi}complexSearch?query=${query}&type=${type}&number=${number}&apiKey=${apiKey}`
    );

    const data = await response.json();
    const recipes = data.results;

    return recipes;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getRecipe = async (id) => {
  try {
    const response = await fetch(
      `${spoonacularBaseApi}${id}/information?apiKey=${apiKey}&includeNutrition=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = await response.json();
    const recipe = responseData;

    return recipe;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

export const getRecipeInstruction = async (id) => {
  try {
    const response = await fetch(
      `${spoonacularBaseApi}${id}/analyzedInstructions?apiKey=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseData = await response.json();
    const recipe = responseData;

    return recipe;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const AddToFavorite = async ({ id, token }) => {
  const response = await sendRequest({
    url: `favorites/create`,
    token,
    method: `POST`,
    data: { recipeId: id },
  });

  return response;
};

export const getFavorites = async (token) => {
  const response = await sendRequest({ url: `favorites`, token });
  console.log(response);
  return response;
};

export const DeleteFromFavorites = async ({ id, token }) => {
  const response = await sendRequest({
    url: `favorites/remove`,
    token,
    method: `DELETE`,
    data: { favoriteId: id },
  });
};

export const searchRecipesByIds = async ({ recipeIds }) => {
  const url = `${spoonacularBaseApi}informationBulk?ids=${recipeIds.join(
    ','
  )}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`Error fetching recipe with ID `, error);
  }
};

export const ChangePassword = async ({ token, data }) => {
  const response = await sendRequest({
    url: `users/updateMyPassword`,
    token,
    method: `PATCH`,
    data: data,
  });
  return response;
};

export const searchRecipesv2 = async ({ searchText }) => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&number=10&apiKey=${apiKey}`
    );
    const data = await response.json();

    return data;
  } catch (error) {}
};

export const getRandomRecipes = async () => {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`
    );

    const data = await response.json();
    return data;
  } catch (error) {}
};
