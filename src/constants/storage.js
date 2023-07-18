import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(value, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async (value) => {
  try {
    const jsonValue = await AsyncStorage.getItem(value);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
