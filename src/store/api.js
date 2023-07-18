const BaseUrl = 'http://localhost:4000/api/v1/';

export const CreateUser = async (userData) => {
  try {
    const response = await fetch(`${BaseUrl}users/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const LoginUser = async (userData) => {
  try {
    console.log(userData);
    const response = await fetch(`${BaseUrl}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
