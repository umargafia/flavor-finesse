import { useCheckUser, useLogoutUser } from '../constants/checkAuthUser';

const BaseUrl = '(http://192.168.0.133:4000/api/v1/';

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
    return error;
  }
};
