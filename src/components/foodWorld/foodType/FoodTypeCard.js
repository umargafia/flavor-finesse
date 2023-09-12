import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import MyCard from '../../global/MyCard';
import { Theme } from '../../../constants/Theme';

const theme = Theme();

export default function FoodTypeCard({ icon, title, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.active]}
      onPress={onPress}
    >
      <MyCard style={styles.card}>
        <Text style={styles.icon}>{icon}</Text>
      </MyCard>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'center',
    opacity: 0.6,
  },
  card: {
    // width: theme.window.windowWidth > 600 ? 100 : 50,
    padding: 10,
    alignItems: 'center',
    backgroundColor: theme.palette.primary,
    borderRadius: theme.window.windowWidth > 600 ? 10 : 10,
  },
  icon: {
    fontSize: 30,
  },
  title: {
    marginTop: 6,
    fontWeight: 'bold',
    color: theme.palette.black,
  },
  active: {
    opacity: 1,
  },
});
