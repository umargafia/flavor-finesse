import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@rneui/base";

import { Theme } from "../../../constants/Theme";
import MyCard from "../../global/MyCard";

const theme = Theme();

const CourseCard = ({ image, text, onPress }) => {
  return (
    <MyCard style={styles.card}>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <LinearGradient
          style={styles.container}
          colors={[theme.palette.primary, theme.palette.tertiary]}
        >
          <Image source={image} style={styles.image} />
          <Divider width={2} />
          <View style={styles.textContainer}>
            <Text style={styles.text}>{text}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </MyCard>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    padding: 0,
    maxWidth: 200,
    ...theme.shadow,
    borderRadius: 8,
    overflow: "hidden",
    margin: 10,
    minWidth: 200,
    maxHeight: 239,
  },
  container: {
    minHeight: 239,
  },
  image: {
    height: 180,
    maxWidth: 200,
  },
  textContainer: {
    alignItems: "center",
    padding: 5,
  },
  text: {
    fontSize: 30,
    color: theme.palette.white,
    fontFamily: theme.font.firasansBold,
    letterSpacing: 3,
  },
});
