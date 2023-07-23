import { useCheckUser, useLogoutUser } from '../constants/checkAuthUser';

const BaseUrl = 'http://192.168.43.187:4000/api/v1/';
const spoonacularBaseApi = 'https://api.spoonacular.com/recipes/';
const apiKey = 'a4b50434521144df923382d472aadfe1';

export const sendRequest = async ({ url, data, method }) => {
  try {
    const response = await fetch(`${BaseUrl}${url}`, {
      method: method ? method : 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const newData = await response.json();
    if (useCheckUser(newData, useLogoutUser)) {
      return;
    }
    return newData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const searchRecipes = async (data) => {
  const query = data.query;
  const type = data.type;
  const number = 10;

  try {
    const response = await fetch(
      `${spoonacularBaseApi}complexSearch?query=${query}&type=${type}&number=${number}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const recipes = data.results;

    return recipes;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getRandomRecipes = async (data) => {
  const tags = data.tags;
  const number = 2;
  const newUrl = `${spoonacularBaseApi}random?number=${number}&tags=${tags}&apiKey=${apiKey}`;

  try {
    const response = await fetch(newUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json(); // Rename 'data' variable to 'responseData'
    const recipes = responseData; // Rename 'data' variable to 'responseData'

    return recipes.recipes;
  } catch (error) {
    console.error('Error fetching data:', error);
    // If you want to return an empty array when there's an error, you can add the following line:
    // return [];
  }
};
