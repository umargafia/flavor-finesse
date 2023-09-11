import { Provider } from 'react-redux';
import { View } from 'react-native';

import Home from './Home';
import store from './src/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Home />
        </View>
      </Provider>
    </>
  );
}
