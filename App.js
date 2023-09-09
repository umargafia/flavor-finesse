import { Provider } from 'react-redux';
import { View } from 'react-native';

import Home from './Home';
import store from './src/store';
import BannerAds from './src/pages/Ads/BannerAds';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <Home />
          <BannerAds />
        </View>
      </Provider>
    </>
  );
}
