import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import Form from '../components/AuthPage/Form';
import { Theme } from '../constants/Theme';

const theme = Theme();
export default function AuthPage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonSection}>
        <Form />
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
});
