import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Theme } from '../constants/Theme';
import MyIcon from '../components/global/MyIcon';
import HomeScreen from './recipesWorld/HomeScreen';
import SearchPage from './recipesWorld/SearchPage';
import Favorite from './Favorite/Favorite';
import Settings from './Settings/Settings';

const BottomTabs = createBottomTabNavigator();
const theme = Theme();
function BottomTabScreens() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.palette.tertiary,
        tabBarIconStyle: () => {},
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'rw/home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'rw/Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'favorite') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'settings') {
            iconName = focused ? 'grid' : 'grid-outline';
          }
          return <MyIcon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <BottomTabs.Screen
        name="rw/home"
        component={HomeScreen}
        options={{
          title: 'Home',
        }}
      />
      <BottomTabs.Screen
        name="rw/Search"
        component={SearchPage}
        options={{
          title: 'Search',
        }}
      />
      <BottomTabs.Screen
        name="favorite"
        component={Favorite}
        options={{
          title: 'Favorite',
        }}
      />
      <BottomTabs.Screen
        name="settings"
        component={Settings}
        options={{
          title: 'More',
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default BottomTabScreens;
