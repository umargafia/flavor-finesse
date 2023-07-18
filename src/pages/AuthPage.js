import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet } from "react-native";

import Form from "../components/AuthPage/Form";
import { Theme } from "../constants/Theme";

const theme = Theme();
export default function AuthPage() {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.palette.primary, theme.palette.tertiary]}
        style={styles.buttonSection}
      >
        <Form />
      </LinearGradient>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  buttonSection: {
    flex: 1,
    backgroundColor: theme.palette.primary,
    opacity: 0.6,

    justifyContent: "center",
    alignItems: "center",
  },
});
