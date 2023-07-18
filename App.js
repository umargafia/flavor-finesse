import { Provider } from 'react-redux';

import Home from './Home';
import store from './src/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Home />
      </Provider>
    </>
  );
}
