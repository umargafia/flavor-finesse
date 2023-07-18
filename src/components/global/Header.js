import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import IconCard from './IconCard';
import { Theme } from '../../constants/Theme';

import { useNavigation } from '@react-navigation/native';

const theme = Theme();
export default function Header({
  text,
  backIcon,
  search,
  onSearchPress,
  star,
}) {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <View style={styles.innerContainer}>
        {backIcon && (
          <IconCard
            name="chevron-back-outline"
            component
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
            color={theme.palette.white}
          />
        )}
        <Text style={styles.header}>{text}</Text>
      </View>

      <View style={styles.innerContainer}>
        {search && (
          <IconCard
            name="search"
            component
            color={theme.palette.white}
            onPress={onSearchPress}
            style={{ backgroundColor: theme.palette.primary, marginRight: 10 }}
          />
        )}
        {star && (
          <IconCard
            name="star"
            component
            color={theme.palette.white}
            style={{ backgroundColor: theme.palette.primary }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: theme.window.windowWidth > 800 ? 10 : '10%',
  },
  header: {
    fontSize: 32,
    letterSpacing: 2,
    fontFamily: theme.font.firasansBold,
    color: theme.palette.primary,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  backIcon: {
    height: 50,
    marginRight: 10,
    backgroundColor: theme.palette.tertiary,
    alignSelf: 'center',
  },
});
