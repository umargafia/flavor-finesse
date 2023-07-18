import { StyleSheet, Text, View } from 'react-native';

const MyGrid = ({ children, colum, style }) => {
  return (
    <View
      style={[
        { flexDirection: colum ? 'column' : 'row', alignItems: 'center' },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default MyGrid;

const styles = StyleSheet.create({});
