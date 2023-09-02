import { StyleSheet, View } from 'react-native';
import React from 'react';

import Header from '../../components/global/Header';
import MyInput from '../../components/global/MyInput';
import { Theme } from '../../constants/Theme';

const theme = Theme();

const SearchPage = () => {
  return (
    <View style={styles.container}>
      <Header text="Search" />
      <View>
        <MyInput
          text="search"
          name="search"
          inputStyle={styles.input}
          style={styles.inputContainer}
        />
      </View>
    </View>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    margin: 20,
  },
  inputContainer: {
    marginTop: 30,
    width: '95%',
  },
  input: {
    backgroundColor: theme.palette.white,
    borderColor: theme.palette.primary,
    borderWidth: 1,
    ...theme.ShadowLight,
  },
  title: {
    fontSize: theme.window.windowWidth <= 360 ? 30 : 40,
    color: 'black',
    fontFamily: theme.font.DancingScriptMedium,
    marginBottom: 20,
  },
});
