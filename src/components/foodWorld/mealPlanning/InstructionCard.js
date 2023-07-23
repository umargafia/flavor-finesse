import { StyleSheet, Text, View } from 'react-native';

import MyCard from '../../global/MyCard';
import { Theme } from '../../../constants/Theme';

const theme = Theme();
export default function InstructionCard({ item }) {
  return (
    <MyCard style={styles.container}>
      <Text style={styles.header}>Step {item.number}</Text>
      <Text style={styles.procedure}>{item.step}</Text>
    </MyCard>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    ...theme.shadow,
  },
  header: {
    fontSize: 20,
    fontFamily: theme.font.firasansBold,
  },
  procedure: {
    fontSize: 16,
    fontFamily: theme.font.sansRegular,
    marginTop: 10,
  },
});
